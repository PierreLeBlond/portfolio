<script lang="ts">
  import { tweened } from "svelte/motion";
  import { getContext, onMount, type Snippet } from "svelte";
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import mask from "./mask.png";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );

  let width: number = $state(0);
  let height: number = $state(0);

  interface Props {
    columns: number;
    frames: number;
    loaded: boolean;
    children: Snippet;
  }

  let { columns, frames, loaded, children }: Props = $props();

  const frame = tweened(0, { duration: 1500 });

  let imageData: string | null = $state(null);
  let maskData: string | null = $state(null);

  let mounted = $state(false);
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

  $effect(() => {
    if (loaded) {
      frame.set(frames - 1);
    }
  });
  let maskWidth = $derived(width * columns);
  let maskHeight = $derived(height * Math.ceil(frames / columns));
  let maskX = $derived(-(Math.trunc($frame) % columns) * width);
  let maskY = $derived(-Math.trunc(Math.trunc($frame) / columns) * height);
</script>

<div
  class="relative h-full w-full"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  {#if mounted}
    {@render children()}
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
