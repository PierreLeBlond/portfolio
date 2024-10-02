<script lang="ts">
  import { descriptionOpenStatus } from "$lib/stores/descriptionOpenStatus";
  import { fade, fly, scale } from "svelte/transition";
  import About from "./About.svelte";
  import Navigation from "./Navigation.svelte";

  export let title: string;
  export let githubLink: string | null = null;
  export let link: string | null = null;
  export let screenshots: string[] = [];
</script>

<section
  class="hidden h-full w-full flex-col justify-between bg-stone-100 p-8 horizontal:flex"
  transition:fly|global={{ duration: 400, x: 400 }}
>
  <About {title} {githubLink} {link} {screenshots} scrollKey="horizontal"
    ><slot /></About
  >
  <Navigation></Navigation>
</section>

<section
  class="flex h-24 w-full justify-center horizontal:hidden xs:w-[384px]"
  transition:fly|global={{ duration: 400, y: 400 }}
>
  <div
    class="flex w-full justify-between bg-stone-100 shadow-lg xs:rounded-t-xl"
  >
    <Navigation></Navigation>
  </div>
</section>

{#if $descriptionOpenStatus}
  <div
    class="absolute bottom-0 right-0 flex h-screen w-full justify-center text-base horizontal:hidden"
    transition:fade|global={{ duration: 400 }}
  >
    <button
      class="absolute top-0 h-full w-full bg-stone-700/40"
      on:click={() => descriptionOpenStatus.set(false)}
    >
    </button>
    <div
      class="absolute bottom-0 flex h-[90%] w-full bg-stone-100 px-2 pb-24 shadow-lg"
      transition:fly|global={{ duration: 400, y: 400 }}
    >
      <About {title} {githubLink} {link} {screenshots} scrollKey="vertical"
        ><slot /></About
      >
    </div>
  </div>
{:else}
  <div
    class="absolute bottom-0 w-full bg-stone-100 px-4 pb-24 pt-2 shadow-lg empty:hidden horizontal:hidden xs:w-[384px] xs:rounded-t-xl"
    transition:fly|global={{ duration: 400, y: 400 }}
  >
    <slot name="excerpt" />
  </div>
{/if}
