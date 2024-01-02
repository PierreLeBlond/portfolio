<script lang="ts">
  import Button from "$lib/components/reusable/Button.svelte";
  import { touchedPage } from "$lib/stores/selectedPage";
</script>

{#if $touchedPage}
  <div class="absolute bottom-64 left-[50%] z-40 -translate-x-[50%]">
    <Button href={$touchedPage.pathname}
      ><div class="flex h-24 w-24 items-center justify-center font-bold">
        EXPLORE
      </div></Button
    >
  </div>
{/if}
