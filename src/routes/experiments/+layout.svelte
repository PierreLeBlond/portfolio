<script lang="ts">
  import { page } from '$app/stores';
  import { expoOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  $: path = $page.url.pathname;
</script>

<div
  transition:scale={{ easing: expoOut, duration: 500 }}
  class="absolute w-full h-full flex justify-center items-center"
>
  <!-- https://github.com/sveltejs/kit/issues/2527 -->
  {#if path.startsWith('/experiments')}
    <slot />
  {/if}
</div>
