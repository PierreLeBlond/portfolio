<script lang="ts">
  import { page } from '$app/stores';

  $: path = $page.url.pathname;
</script>

<div class="absolute flex h-full w-full items-center justify-center">
  <!-- https://github.com/sveltejs/kit/issues/2527 -->
  {#if path.startsWith('/experiments')}
    <slot />
  {/if}
</div>
