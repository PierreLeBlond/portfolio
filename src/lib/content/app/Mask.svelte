<script lang="ts">
  import { tweened } from "svelte/motion";
  import { getContext, onMount } from "svelte";
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import mask from "./mask.png";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );

  export let columns: number;
  export let frames: number;

  let width: number;
  let height: number;

  export let loaded: boolean;
  $: if (loaded) {
    frame.set(frames - 1);
  }

  const frame = tweened(0, { duration: 1500 });

  let imageData: string;
  let maskData: string;

  let mounted = false;
  onMount(async () => {
    const mainPublicViewer = await mainPublicViewerContext.getPublicViewer();

    const { camera, renderer, scene } = mainPublicViewer.viewer;

    renderer.render(scene, camera);
    imageData = renderer.domElement.toDataURL();

    const maskImage = new Image();
    maskImage.src = mask;
    maskImage.onload = () => {
      // Using base64 image to avoid blinking due to image preloading
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.height = 2560;
      canvas.width = 3072;
      ctx.drawImage(maskImage, 0, 0);
      maskData = canvas.toDataURL();
      mounted = true;
    };
  });

  $: maskWidth = width * columns;
  $: maskHeight = height * Math.ceil(frames / columns);
  $: maskX = -(Math.trunc($frame) % columns) * width;
  $: maskY = -Math.trunc(Math.trunc($frame) / columns) * height;
</script>

<div
  class="relative h-full w-full"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  {#if mounted}
    <slot />
  {/if}
  <div
    class="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center"
  >
    <img
      src={imageData}
      alt={"Animated mask"}
      class="h-full w-full"
      style:object-position={"left"}
      style:object-fit={"cover"}
      style:-webkit-mask-image={`url(${maskData})`}
      style:mask-image={`url(${maskData})`}
      style:-webkit-mask-repeat={"no-repeat"}
      style:mask-repeat={"no-repeat"}
      style:-webkit-mask-size={`${maskWidth}px ${maskHeight}px`}
      style:mask-size={`${maskWidth}px ${maskHeight}px`}
      style:-webkit-mask-position={`left ${maskX}px top ${maskY}px`}
      style:mask-position={`left ${maskX}px top ${maskY}px`}
    />
  </div>
</div>
