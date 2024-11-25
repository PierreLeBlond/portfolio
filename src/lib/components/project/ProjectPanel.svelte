<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import About from "./About.svelte";
  import Navigation from "./Navigation.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    githubLink: string | null;
    link: string | null;
    screenshots: string[];
    about: Snippet;
    excerpt?: Snippet;
  }

  let { title, githubLink, link, screenshots, about, excerpt }: Props =
    $props();

  let open = $state(false);
</script>

<section
  class="hidden h-full w-full flex-col justify-between bg-stone-100 p-8 horizontal:flex"
  transition:fly|global={{ duration: 400, x: 400, delay: 1 }}
>
  <About {title} {githubLink} {link} {screenshots} scrollKey="horizontal"
    >{@render about()}</About
  >
  <Navigation bind:open></Navigation>
</section>

<section
  class="flex h-24 w-full justify-center horizontal:hidden xs:w-[384px]"
  transition:fly|global={{ duration: 400, y: 400, delay: 1 }}
>
  <div
    class="flex w-full justify-between bg-stone-100 shadow-lg xs:rounded-t-xl"
  >
    <Navigation bind:open></Navigation>
  </div>
</section>

{#if open}
  <div
    class="absolute bottom-0 right-0 flex h-screen w-full justify-center text-base horizontal:hidden"
    transition:fade|global={{ duration: 400, delay: 1 }}
  >
    <button
      aria-label="close"
      class="absolute top-0 h-full w-full bg-stone-700/40"
      onclick={() => (open = false)}
    >
    </button>
    <div
      class="absolute bottom-0 flex h-[90%] w-full bg-stone-100 px-2 pb-24 shadow-lg"
      transition:fly|global={{ duration: 400, y: 400, delay: 1 }}
    >
      <About {title} {githubLink} {link} {screenshots} scrollKey="vertical"
        >{@render about()}</About
      >
    </div>
  </div>
{:else}
  <div
    class="absolute bottom-0 w-full bg-stone-100 px-4 pb-24 pt-2 shadow-lg empty:hidden horizontal:hidden xs:w-[384px] xs:rounded-t-xl"
    transition:fly|global={{ duration: 400, y: 400, delay: 1 }}
  >
    {@render excerpt?.()}
  </div>
{/if}
