<script lang="ts">
  import { getContext } from 'svelte';
  import ObjectPointer from './ObjectPointer.svelte';
  import ObjectSelector from './ObjectSelector.svelte';
  import Object from './Object.svelte';
  import type { THREE } from '@s0rt/3d-viewer';
  import { page } from '$app/stores';
  import { pointedPathname } from '$lib/stores/pathname';
  import { base } from '$app/paths';
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
  import { appState } from '$lib/state/appState';
  import { selectedObject } from './selectedObject';
  import { previouslySelectedObject } from './previouslySelectedObject';
  import { configureObjects } from './configureObjects';
  import type { PublicViewerContext } from '../PublicViewerContext';

  const { viewer } = getContext<PublicViewerContext>('mainPublicViewerContext').getPublicViewerSync();
  const { scene } = viewer;

  const pathnameMap = configureObjects(scene, $page.data['pages']);

  const selectableObjects = $page.data['pages'].map(({ objectName }: { objectName: string; pathname: string }) => {
    const object = scene.getObjectByName(objectName);
    if (!object) {
      throw new Error(`Object with name ${objectName} does not exists`);
    }
    return object;
  });

  const pointableObjects: THREE.Object3D[] = scene.children;
  let pointedObject: THREE.Object3D | null = null;
  let touchedObject: THREE.Object3D | null = null;
  const setSelectedObjectFromPathname = (pathname: string) => {
    const object = pathnameMap.get(pathname) || null;

    previouslySelectedObject.set($selectedObject);
    selectedObject.set(object);
  };
  setSelectedObjectFromPathname($page.url.pathname);
  afterNavigate(() => {
    pointedObject = null;
    touchedObject = null;
  });
  beforeNavigate((navigation) => {
    if (!navigation.to) {
      return;
    }

    setSelectedObjectFromPathname(navigation.to.url.pathname);
  });

  const onSelected = (event: CustomEvent<{ object: THREE.Object3D }>) => {
    const { object } = event.detail;

    const pathname = object.userData['pathname'];

    if (event.detail.object.userData['isExternal']) {
      window.open(pathname);
      return;
    }

    goto(`${base}${pathname}`);
  };

  const onPointed = (event: CustomEvent<{ pathname: string }>) => {
    $pointedPathname = event.detail.pathname;
  };
</script>

{#if $page.data['isHome'] && $appState == 'idle'}
  <ObjectPointer
    {selectableObjects}
    {pointableObjects}
    on:pointed={onPointed}
    bind:pointedObject
    bind:touchedObject
  >
    <ObjectSelector
      {selectableObjects}
      {pointedObject}
      {touchedObject}
      on:selected={onSelected}
    />
  </ObjectPointer>
{/if}

{#each selectableObjects as selectableObject}
  <Object
    object={selectableObject}
    pointed={selectableObject == pointedObject || selectableObject == touchedObject}
    selected={$selectedObject == selectableObject}
  />
{/each}
