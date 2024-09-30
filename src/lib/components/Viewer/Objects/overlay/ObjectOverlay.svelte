<script lang="ts">
  import { getScreenProjectedPosition } from "$lib/components/Viewer/Objects/overlay/getScreenProjectedPosition";
  import { getContext, onDestroy, onMount } from "svelte";
  import type { PublicViewerContext } from "../../PublicViewerContext";
  import { page } from "$app/stores";
  import { THREE } from "@s0rt/3d-viewer";
  import { fly } from "svelte/transition";
  import { type Page, touchedPage } from "$lib/stores/selectedPage";

  const { viewer } = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  ).getPublicViewerSync();
  const { camera, controls } = viewer;

  export let object: THREE.Object3D;

  const objectWithOffsetedLabelName = [
    "Wave",
    "Teamup",
    "Quests",
    "Ustom",
    "Recipe",
  ];
  const isOffseted = objectWithOffsetedLabelName.includes(object.name);

  const objectPage = $page.data["pages"].find(
    (page: Page) => page.objectName === object?.name,
  );
  if (!objectPage) {
    throw new Error(`Page not found for ${object.name}`);
  }
  const label = objectPage.label || null;

  let toVector3 = (v: THREE.Vector4) => new THREE.Vector3(v.x, v.y, v.z);

  const position =
    object.type == "SkinnedMesh"
      ? toVector3(
          new THREE.Vector4(1.0, 1.0, 1.0, 1.0).setFromMatrixPosition(
            object.matrixWorld,
          ),
        )
      : object.position.clone();

  let clientWidth: number = 0;
  let clientHeight: number = 0;

  let xOffset = 0;
  let yOffset = 0;

  let onControlsChange = () => {
    const projectedPosition = getScreenProjectedPosition(
      position,
      camera.projectionMatrix,
      camera.matrixWorldInverse,
      { width: clientWidth, height: clientHeight },
    );

    xOffset = projectedPosition.x;
    yOffset = projectedPosition.y;
  };

  controls.addEventListener("change", onControlsChange);

  onMount(() => {
    onControlsChange();
  });

  onDestroy(() => {
    controls.removeEventListener("change", onControlsChange);
  });
</script>

<div
  class="pointer-events-none absolute top-0 h-full w-full"
  bind:clientWidth
  bind:clientHeight
>
  <div
    class="absolute"
    style:transform="translateX({xOffset}px) translateY({yOffset}px)"
  >
    <p
      class="absolute flex -translate-x-1/2 {isOffseted
        ? '-translate-y-12'
        : '-translate-y-16'} text-nowrap rounded-md bg-stone-200 px-2 py-1 shadow-sm"
      transition:fly|global={{ y: 30 }}
    >
      {label}
    </p>
    {#if $touchedPage === objectPage}
      <a
        href={objectPage.pathname}
        class="pointer-events-auto absolute flex -translate-x-1/2 {isOffseted
          ? 'translate-y-8'
          : 'translate-y-4'} text-nowrap rounded-md bg-stone-900 px-2 py-1 text-stone-100 shadow-sm"
        transition:fly|global={{ y: -10 }}
      >
        see more
      </a>
    {/if}
  </div>
</div>
