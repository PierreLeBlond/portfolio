<script lang="ts">
  import { getContext } from 'svelte';
  import ObjectPointer from './ObjectPointer.svelte';
  import ObjectSelector from './ObjectSelector.svelte';
  import Object from './Object.svelte';
  import type { THREE } from '@s0rt/3d-viewer';
  import { page } from '$app/stores';
  import { pointedPathname, selectedPathname } from '$lib/stores/pathname';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { viewerState } from '$lib/stores/viewerState';

  const { viewer } = getContext('mainPublicViewerContext').getPublicViewerSync();
  const { scene } = viewer;

  const selectableObjects = $page.data['pages'].map(({ objectName }: { objectName: string; pathname: string }) => {
    const object = scene.getObjectByName(objectName);
    if (!object) {
      throw new Error(`Object with name ${objectName} does not exists`);
    }
    return object;
  });

  const pointableObjects: THREE.Object3D[] = scene.children;
  let pointedObject: THREE.Object3D | null = null;

  const onSelected = (event: CustomEvent<{ object: THREE.Object3D }>) => {
    const pathname = event.detail.object.userData['pathname'];

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

{#if $page.data['isHome'] && $viewerState == 'ready'}
  <ObjectPointer
    {pointableObjects}
    on:pointed={onPointed}
    bind:pointedObject
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
    pointed={selectableObject == pointedObject}
    selected={selectableObject.userData['pathname'] == $selectedPathname}
  />
{/each}
