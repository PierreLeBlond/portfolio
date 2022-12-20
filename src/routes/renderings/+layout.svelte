<script lang="ts">
  import Loading from '$lib/loading/Loading.svelte';
  import * as VIEWER from '@s0rt/3d-viewer';
  import { onMount, onDestroy } from 'svelte';
  import { setContext } from 'svelte';
  import type { LayoutData } from './$types';
  import { writable, type Writable } from 'svelte/store';
  import { page } from '$app/stores';

  $: path = $page.url.pathname;

  export let data: LayoutData;

  const viewerContext: Writable<null | VIEWER.PublicViewer> = writable(null);
  setContext('viewer', viewerContext);

  let progression = 0;
  $: loading = progression != 1;
  const updateProgression = (
    event: VIEWER.THREE.Event & { type: 'taskCompleted' } & { target: VIEWER.PublicViewer }
  ) => {
    progression = event['progression'];
  };

  onMount(async () => {
    // page scenes require viewer lib as a external dependency
    window.VIEWER = VIEWER;

    const publicViewer = new VIEWER.PublicViewer('viewer');
    publicViewer.addEventListener('taskCompleted', updateProgression);
    publicViewer.addTasks({
      parallelTasks: [
        {
          task: async () => {
            await publicViewer.loadIbl(data.irradiance, data.radiance);
            publicViewer.viewer.setIblSpace(VIEWER.IblSpace.View);
          }
        }
      ]
    });
    await publicViewer.launch();

    viewerContext.set(publicViewer);
  });

  onDestroy(() => {
    if ($viewerContext) {
      $viewerContext.removeEventListener('taskCompleted', updateProgression);
      $viewerContext.dispose();
    }
  });
</script>

<div class="absolute w-full h-full">
  <div
    style:visibility={loading ? 'hidden' : 'visible'}
    class="relative w-full h-full flex justify-center items-center"
    id="viewer"
  />

  <!-- https://github.com/sveltejs/kit/issues/2527 -->
  {#if path.startsWith('/renderings')}
    {#if loading}
      <div class="absolute w-full h-full top-0 flex flex-col justify-center items-center">
        <Loading />
        <p>{$page.data['loadingJoke']}</p>
        <!--p>{progression}%</p-->
      </div>
    {/if}
    <slot />
  {/if}
</div>
