<script lang="ts">
  import { getContext } from "svelte";
  import ObjectPointer from "./ObjectPointer.svelte";
  import ObjectSelector from "./ObjectSelector.svelte";
  import Object from "./Object.svelte";
  import type { THREE } from "@s0rt/3d-viewer";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { configureObjects } from "./configureObjects";
  import type { PublicViewerContext } from "../PublicViewerContext";
  import { afterNavigate, goto } from "$app/navigation";
  import { getAppContext } from "$lib/context/appContext";
  import { globalState, type Page } from "$lib/state/globalState.svelte";

  const { viewer } = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  ).getPublicViewerSync();
  const { scene } = viewer;

  let app = getAppContext();

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
  let pointedObject: THREE.Object3D | null = $state(null);
  let touchedObject: THREE.Object3D | null = $state(null);

  $effect(() => {
    globalState.pointedPage =
      $page.data["pages"].find(
        (page: Page) => page.objectName === pointedObject?.name,
      ) || null;
  });

  $effect(() => {
    globalState.touchedPage =
      $page.data["pages"].find(
        (page: Page) => page.objectName === touchedObject?.name,
      ) || null;
  });

  afterNavigate(() => {
    pointedObject = null;
    touchedObject = null;
  });

  const onSelected = (object: THREE.Object3D | null) => {
    const selectedPage = $page.data["pages"].find(
      (page: Page) => page.objectName === object?.name,
    );

    goto(`${base}${selectedPage.pathname}`);
  };
</script>

{#if $page.data["isHome"] && app.state === "idle"}
  <ObjectPointer
    {selectableObjects}
    {pointableObjects}
    bind:pointedObject
    bind:touchedObject
  >
    <ObjectSelector {selectableObjects} {pointedObject} {onSelected} />
  </ObjectPointer>
{/if}

{#each selectableObjects as selectableObject}
  <Object
    object={selectableObject}
    highlighted={selectableObject === pointedObject ||
      selectableObject === touchedObject}
    entered={selectableObject === globalState.selectedObject}
  />
{/each}
