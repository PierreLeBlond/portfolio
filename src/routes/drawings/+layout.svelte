<script lang="ts">
  import { page } from '$app/stores';
  import CubeViewer from '$lib/viewers/cube/CubeViewer.svelte';

  $: path = $page.url.pathname;

  $: urls = $page.data['urls'] || [];
  $: texts = $page.data['texts'] || [];
  $: pageIndex = $page.data['pageIndex'];
</script>

<div class="absolute w-full h-full flex justify-center items-center">
  <!-- https://github.com/sveltejs/kit/issues/2527 -->
  {#if path.startsWith('/drawings')}
    <CubeViewer
      {urls}
      {texts}
      {pageIndex}
    />

    <slot />
  {/if}
</div>
