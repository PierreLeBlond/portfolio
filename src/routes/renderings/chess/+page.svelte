<script lang="ts">
  import type { PublicViewer } from '@s0rt/3d-viewer';
  import { getContext, onDestroy } from 'svelte';
  import type { Writable } from 'svelte/store';

  const viewer: Writable<null | PublicViewer> = getContext('viewer');

  let chessboard: { start: () => any; stop: () => void };
  const start = async (publicViewer: PublicViewer) => {
    const Chessboard = (await import('https://app.pierrelespingal.xyz/chess/v2.1.2/lib/index.js')).default;
    chessboard = new Chessboard(publicViewer);
    await chessboard.start();
  };

  $: (async () => {
    if ($viewer) {
      await start($viewer);
    }
  })();

  onDestroy(() => {
    if (chessboard) {
      chessboard.stop();
    }
  });
</script>
