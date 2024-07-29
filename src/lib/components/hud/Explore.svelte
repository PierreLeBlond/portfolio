<script lang="ts">
  import { touchedPage } from "$lib/stores/selectedPage";
  import { fly } from "svelte/transition";
</script>

{#if $touchedPage}
  <div
    class="absolute bottom-0 left-[50%] z-40 w-full -translate-x-[50%]"
    transition:fly|global={{ duration: 400, y: 400 }}
  >
    <a
      href={$touchedPage.pathname}
      class="flex h-24 w-full items-center justify-center bg-stone-200 font-bold"
    >
      Explore
    </a>
  </div>
{/if}
