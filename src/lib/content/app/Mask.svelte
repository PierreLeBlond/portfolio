<script lang="ts">
  import { tweened } from "svelte/motion";
  import { getContext, onDestroy, onMount } from "svelte";
  import { THREE } from "@s0rt/3d-viewer";
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import mask from "./mask.png";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );

  export let columns: number;
  export let frames: number;

  export let width: number;
  export let height: number;

  export let name: string;

  const frame = tweened(0, { duration: 1500 });

  let imageData: string;

  let material: THREE.MeshPhysicalMaterial;
  let map: THREE.Texture | null;
  let emissiveMap: THREE.Texture | null;

  let mounted = false;
  onMount(async () => {
    const mainPublicViewer = await mainPublicViewerContext.getPublicViewer();

    const { camera, renderer, scene } = mainPublicViewer.viewer;

    renderer.render(scene, camera);
    imageData = renderer.domElement.toDataURL();

    const object = scene.getObjectByName(name) as THREE.Mesh;
    if (!object) {
      throw new Error("Object Wave does not exists");
    }

    material = object.material as THREE.MeshPhysicalMaterial;

    map = material.map;
    emissiveMap = material.emissiveMap;

    const maskImage = new Image();
    maskImage.src = mask;
    maskImage.onload = () => {
      frame.set(frames - 1);
      mounted = true;

      material.map = null;
      material.emissiveMap = null;
      material.emissive = new THREE.Color(0xffffff);
      material.needsUpdate = true;

      renderer.render(scene, camera);
    };
  });

  onDestroy(() => {
    material.map = map;
    material.emissiveMap = emissiveMap;
    material.needsUpdate = true;
  });

  $: maskWidth = width * columns;
  $: maskHeight = height * Math.ceil(frames / columns);
  $: maskX = -(Math.trunc($frame) % columns) * width;
  $: maskY = -Math.trunc(Math.trunc($frame) / columns) * height;
</script>

<div class="relative h-full w-full">
  {#if mounted}
    <slot />
  {/if}
  <div
    class="pointer-events-none absolute top-0 flex h-full w-full items-center justify-center large:w-[150%] large:-translate-x-[25%]"
  >
    <RatioBox ratio={112.5 / 157.5}>
      <img
        src={imageData}
        alt={"Animated mask"}
        class="h-full w-full"
        style:object-position={"center"}
        style:object-fit={"cover"}
        style:-webkit-mask-image={`url(${mask})`}
        style:mask-image={`url(${mask})`}
        style:-webkit-mask-repeat={"no-repeat"}
        style:mask-repeat={"no-repeat"}
        style:-webkit-mask-size={`${maskWidth}px ${maskHeight}px`}
        style:mask-size={`${maskWidth}px ${maskHeight}px`}
        style:-webkit-mask-position={`left ${maskX}px top ${maskY}px`}
        style:mask-position={`left ${maskX}px top ${maskY}px`}
      />
    </RatioBox>
  </div>
</div>
