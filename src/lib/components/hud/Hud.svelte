<script lang="ts">
  import { descriptionOpenStatus } from "$lib/stores/descriptionOpenStatus";
  import { fade, fly, scale } from "svelte/transition";
  import Description from "./Description.svelte";
  import Navigation from "./Navigation.svelte";
  import { page } from "$app/stores";

  export let title: string;
  export let githubLink: string | null = null;
  export let link: string | null = null;

  $: isHome = $page.data["isHome"];
</script>

<section
  class="flex h-24 w-full justify-center horizontal:h-full horizontal:py-16 horizontal:pr-24 xs:w-[384px]"
  transition:scale|global={{ duration: 400 }}
>
  <div
    class="flex w-full justify-between bg-stone-200 shadow-lg horizontal:flex-col horizontal:rounded-xl horizontal:p-8 xs:rounded-t-xl"
  >
    <div class="hidden horizontal:block">
      <Description {title} {githubLink} {link}><slot /></Description>
    </div>
    {#if !isHome}
      <Navigation></Navigation>
    {/if}
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
{/if}
