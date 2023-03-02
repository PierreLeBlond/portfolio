<script lang="ts">
  import { page } from '$app/stores';
  import CubeViewer from '$lib/content/drawings/CubeViewer.svelte';
  import { pageDialog } from '$lib/stores/pageDialog';
  import { onDestroy } from 'svelte';

  $: path = $page.url.pathname;

  $: urls = $page.data['urls'] || [];
  $: texts = $page.data['texts'] || [];
  $: pageIndex = $page.data['pageIndex'];

  let text: string | null;
  $: pageDialog.set(text);

  onDestroy(() => {
    pageDialog.set(null);
  });
</script>

<div class="absolute flex h-full w-full items-center justify-center">
  <!-- https://github.com/sveltejs/kit/issues/2527 -->
  {#if path.startsWith('/drawings/logo')}
    <CubeViewer
      {urls}
      {texts}
      {pageIndex}
      bind:text
    />
    <slot />
  {/if}
</div>
