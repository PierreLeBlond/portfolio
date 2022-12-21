<script lang="ts">
  import type { PublicViewer } from '@s0rt/3d-viewer';
  import { getContext, onDestroy } from 'svelte';
  import type { Writable } from 'svelte/store';

  const viewer: Writable<null | PublicViewer> = getContext('viewer');

  let earth: { start: () => any; stop: () => void };
  const start = async () => {
    const Earth = (await import('https://app.pierrelespingal.xyz/earth/v1.1.2/lib/index.js')).default;
    earth = new Earth($viewer);
    await earth.start();
  };

  $: (async () => {
    if ($viewer) {
      await start();
    }
  })();

  onDestroy(() => {
    if (earth) {
      earth.stop();
    }
  });
</script>
