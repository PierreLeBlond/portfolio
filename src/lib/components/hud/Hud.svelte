<script lang="ts">
  import { descriptionOpenStatus } from "$lib/stores/descriptionOpenStatus";
  import { fade, fly, scale } from "svelte/transition";
  import Description from "./Description.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let githubLink: string | null = null;
  export let link: string | null = null;
</script>

<section
  class="hidden h-full w-full justify-center py-16 pr-24 horizontal:flex"
  transition:scale|global={{ duration: 400 }}
>
  <div
    class="flex w-full flex-col justify-between rounded-xl bg-stone-200 p-8 shadow-lg"
  >
    <Description {title} {githubLink} {link}><slot /></Description>
    <Navigation></Navigation>
  </div>
</section>

<section
  class="flex h-24 w-full justify-center horizontal:hidden xs:w-[384px]"
  transition:fly|global={{ duration: 400, y: 400 }}
>
  <div
    class="flex w-full justify-between bg-stone-200 shadow-lg xs:rounded-t-xl"
  >
    <Navigation></Navigation>
  </div>
</section>

{#if $descriptionOpenStatus}
  <div
    class="fixed right-0 top-0 flex h-screen w-full justify-center bg-stone-700/40 text-base horizontal:hidden"
    transition:fade|global={{ duration: 400 }}
  >
    <div
      class="absolute bottom-0 w-full bg-stone-200 px-8 pb-48 shadow-lg xs:w-[384px] xs:rounded-t-xl"
      transition:fly|global={{ duration: 400, y: 400 }}
    >
      <Description {title} {githubLink} {link}><slot /></Description>
    </div>
  </div>
{:else}
  <div
    class="absolute bottom-0 w-full bg-stone-200 px-4 pb-24 pt-2 shadow-lg empty:hidden horizontal:hidden xs:w-[384px] xs:rounded-t-xl"
    transition:fly|global={{ duration: 400, y: 400 }}
  >
    <slot name="excerpt" />
  </div>
{/if}
