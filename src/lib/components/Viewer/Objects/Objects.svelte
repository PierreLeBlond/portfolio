<script lang="ts">
  import { getContext } from "svelte";
  import ObjectPointer from "./ObjectPointer.svelte";
  import ObjectSelector from "./ObjectSelector.svelte";
  import Object from "./Object.svelte";
  import type { THREE } from "@s0rt/3d-viewer";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { appState } from "$lib/state/appState";
  import { configureObjects } from "./configureObjects";
  import type { PublicViewerContext } from "../PublicViewerContext";
  import {
    type Page,
    pointedPage,
    currentPage,
    touchedPage,
  } from "$lib/stores/selectedPage";
  import { selectedObject } from "./selectedObject";
  import { previouslySelectedObject } from "./previouslySelectedObject";
  import { afterNavigate, goto } from "$app/navigation";

  const { viewer } = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  ).getPublicViewerSync();
  const { scene } = viewer;

  configureObjects(scene, $page.data["pages"]);

  const selectableObjects = $page.data["pages"].map(
    ({ objectName }: { objectName: string }) => {
      const object = scene.getObjectByName(objectName);
      if (!object) {
        throw new Error(`Object with name ${objectName} does not exists`);
      }
      return object;
    },
  );

  const pointableObjects: THREE.Object3D[] = scene.children;
  let pointedObject: THREE.Object3D | null = null;
  let touchedObject: THREE.Object3D | null = null;

  const setSelectedObjectFromPage = (page: Page | null) => {
    const object = page ? scene.getObjectByName(page.objectName) || null : null;

    previouslySelectedObject.set($selectedObject);
    selectedObject.set(object);
  };
  $: setSelectedObjectFromPage($currentPage);

  $: pointedPage.set(
    $page.data["pages"].find(
      (page: Page) => page.objectName === pointedObject?.name,
    ) || null,
  );

  $: touchedPage.set(
    $page.data["pages"].find(
      (page: Page) => page.objectName === touchedObject?.name,
    ) || null,
  );

  afterNavigate(() => {
    pointedObject = null;
    touchedObject = null;
  });

  const onSelected = (
    event: CustomEvent<{ object: THREE.Object3D | null }>,
  ) => {
    const { object } = event.detail;

    const selectedPage = $page.data["pages"].find(
      (page: Page) => page.objectName === object?.name,
    );

    goto(`${base}${selectedPage.pathname}`);
  };
</script>

{#if $page.data["isHome"] && $appState === "idle"}
  <ObjectPointer
    {selectableObjects}
    {pointableObjects}
    bind:pointedObject
    bind:touchedObject
  >
    <ObjectSelector
      {selectableObjects}
      {pointedObject}
      on:selected={onSelected}
    />
  </ObjectPointer>
{/if}

{#each selectableObjects as selectableObject}
  <Object
    object={selectableObject}
    highlighted={selectableObject === pointedObject ||
      selectableObject === touchedObject}
    entered={selectableObject === $selectedObject}
  />
{/each}
