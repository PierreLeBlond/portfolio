<script lang="ts">
  import { onMount } from 'svelte';
  import { setContext } from 'svelte';
  import { page } from '$app/stores';
  import { configureViewer } from './configureViewer';
  import type { PublicViewer, THREE } from '@s0rt/3d-viewer';
  import { flyTo } from './flyTo';
  import Objects from './Objects/Objects.svelte';
  import { pointedPathname, selectedPathname } from '$lib/stores/pathname';
  import { waitForState } from '$lib/state/waitForState';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';
  import { configureObjects } from './configureObjects';
  import { viewerState } from '$lib/stores/viewerState';
  import { globalState } from '$lib/stores/globalState';

  let publicViewerWritable: Writable<null | PublicViewer> = writable(null);
  const getPublicViewer = async () =>
    new Promise<PublicViewer>((resolve) => {
      if ($publicViewerWritable) {
        resolve($publicViewerWritable);
        return;
      }

      const unsubscribe = publicViewerWritable.subscribe((publicViewer: null | PublicViewer) => {
        if (!publicViewer) {
          return;
        }
        unsubscribe();
        resolve(publicViewer);
      });
    });
  const getPublicViewerSync = () => {
    if (!$publicViewerWritable) {
      throw new Error('Viewer does not exists');
    }
    return $publicViewerWritable;
  };
  setContext('mainPublicViewerContext', { getPublicViewer, getPublicViewerSync });

  let mounted = false;
  onMount(async () => {
    const publicViewer = await configureViewer();
    const { scene } = publicViewer.viewer;

    configureObjects(scene, $page.data['pages']);
    publicViewerWritable.set(publicViewer);

    publicViewer.pause();

    const pathname = $page.url.pathname;
    selectedPathname.set(pathname);

    viewerState.set('mounted');

    await waitForState(globalState, 'introducing');

    await navigateToNewPage();

    viewerState.set('ready');
    mounted = true;
  });

  const fly = async () => {
    const { viewer } = await getPublicViewer();
    const { scene, camera, controls } = viewer;

    const position = $page.data['camera'].position;
    const target = $page.data['camera'].target;
    const minDistance = $page.data['controlMinDistance'];
    await flyTo(scene, camera, controls, { position, target, minDistance });
  };

  let disolvedObject: null | THREE.Object3D = null;
  const disolve = async () => {
    const { viewer } = await getPublicViewer();
    if (!$selectedPathname) {
      return;
    }
    const { scene } = viewer;
    let selectedObject: null | THREE.Object3D = null;
    scene.traverse((object: THREE.Object3D) => {
      if (object.userData['pathname'] == $selectedPathname) {
        selectedObject = object;
      }
    });
    if (!selectedObject) {
      return;
    }
    await viewer.disolveObject(selectedObject, { duration: 0.5, delay: 0.1, color: 0xfb923c });
    disolvedObject = selectedObject;
  };

  const resolve = async () => {
    if (!disolvedObject) {
      return;
    }
    const { viewer } = await getPublicViewer();
    await viewer.resolveObject(disolvedObject, { duration: 0.5, delay: 0.1, color: 0xfb923c });
    disolvedObject = null;
  };

  const navigateToNewPage = async () => {
    const viewer = await getPublicViewer();
    viewer.play();

    pointedPathname.set(null);

    await resolve();

    viewerState.set('flying');

    await fly();

    if ($page.data['disolve']) {
      await disolve();
    }

    if (!$page.data['isHome']) {
      viewer.pause();
    }

    viewerState.set('ready');
  };
  afterNavigate(() => {
    if (!mounted) {
      return;
    }
    navigateToNewPage();
  });
  beforeNavigate(() => {
    viewerState.set('navigating');
  });
</script>

<div
  class="absolute h-full w-full"
  class:cursor-pointer={$pointedPathname}
  id="viewer"
/>

{#if !$page.data['isHome'] && $viewerState == 'ready'}
  <div class="relative z-10 h-full w-full">
    <slot />
  </div>
{/if}

{#await waitForState(viewerState, 'mounted') then}
  <Objects />
{/await}
