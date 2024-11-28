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
  class="relative hidden h-full w-full flex-col justify-between rounded-lg bg-stone-100/50 shadow-lg backdrop-blur-xl horizontal:flex"
  transition:fly|global={{ duration: 400, x: 400, delay: 1 }}
>
  <About {title} {githubLink} {link} {screenshots} scrollKey="horizontal"
    >{@render about()}</About
  >
  <Navigation bind:open></Navigation>
</section>

{#if open}
  <div
    class="pointer-events-auto absolute bottom-0 right-0 flex h-screen w-full justify-center pt-16 text-base horizontal:hidden"
    transition:fade|global={{ duration: 400, delay: 1 }}
  >
    <button
      aria-label="close"
      class="absolute top-0 h-full w-full bg-stone-700/40"
      onclick={() => (open = false)}
    >
    </button>
    <div
      class="h-full w-full overflow-hidden bg-stone-100/50 px-2 pb-32 shadow-lg backdrop-blur-xl"
      transition:fly|global={{ duration: 400, y: 400, delay: 1 }}
    >
      <About {title} {githubLink} {link} {screenshots} scrollKey="vertical"
        >{@render about()}</About
      >
    </div>
  </div>
{:else}
  <div
    class="absolute bottom-0 left-1/2 w-full -translate-x-1/2 px-4 pb-28 pt-2 text-center shadow-lg empty:hidden horizontal:hidden"
    transition:fly|global={{ duration: 400, y: 400, delay: 1 }}
  >
    {@render excerpt?.()}
  </div>
{/if}

<section class="pointer-events-none relative h-full w-full horizontal:hidden">
  <Navigation bind:open></Navigation>
</section>
