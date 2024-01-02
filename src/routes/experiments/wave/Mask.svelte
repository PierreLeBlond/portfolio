<script lang="ts">
  import { tweened } from "svelte/motion";
  import { getContext, onDestroy, onMount } from "svelte";
  import { THREE } from "@s0rt/3d-viewer";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );

  export let url: string;
  export let columns: number;
  export let frames: number;

  export let size: number;

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

    const object = scene.getObjectByName("Wave") as THREE.Mesh;
    if (!object) {
      throw new Error("Object Wave does not exists");
    }

    material = object.material as THREE.MeshPhysicalMaterial;

    map = material.map;
    emissiveMap = material.emissiveMap;

    const maskImage = new Image();
    maskImage.src = url;
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

  $: maskWidth = size * columns;
  $: maskHeight = size * Math.ceil(frames / columns);
  $: maskX = -(Math.trunc($frame) % columns) * size;
  $: maskY = -Math.trunc(Math.trunc($frame) / columns) * size;
</script>

<div class="relative h-full w-full">
  {#if mounted}
    <slot />
  {/if}
  <div
    class="pointer-events-none absolute top-0 h-full w-full large:w-[150%] large:-translate-x-[25%]"
  >
    <RatioBox ratio={1}>
      <img
        src={imageData}
        alt={"Animated mask"}
        class="h-full w-full"
        style:object-position={"center"}
        style:object-fit={"cover"}
        style:-webkit-mask-image={`url(${url})`}
        style:mask-image={`url(${url})`}
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
