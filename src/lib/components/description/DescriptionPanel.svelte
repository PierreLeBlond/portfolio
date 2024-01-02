<script lang="ts">
  import { descriptionOpenStatus } from "$lib/stores/descriptionOpenStatus";
  import { Github, HelpCircle, X } from "lucide-svelte";
  import { fly } from "svelte/transition";
  import Description from "./Description.svelte";

  export let title: string;
  export let githubLink: string | null = null;
</script>

<section
  class="pointer-events-none absolute right-0 top-0 hidden h-screen w-1/2 large:flex"
>
  <Description {title} {githubLink}><slot /></Description>
</section>

{#if !$descriptionOpenStatus}
  <button
    class="absolute right-8 top-8 z-40 rounded-full bg-stone-200 p-2 text-stone-700 shadow-lg large:hidden"
    on:click={() => descriptionOpenStatus.set(true)}
    on:keydown={() => descriptionOpenStatus.set(true)}
    transition:fly|global={{ duration: 400, x: 500 }}
  >
    <HelpCircle></HelpCircle>
  </button>
{/if}

{#if $descriptionOpenStatus}
  <div
    class="pointer-events-none absolute right-0 top-0 flex h-screen w-full large:hidden"
  >
    <button
      class="pointer-events-auto absolute right-8 top-8 rounded-full bg-stone-200 p-2 text-stone-700 shadow-lg large:hidden"
      on:click={() => descriptionOpenStatus.set(false)}
      on:keydown={() => descriptionOpenStatus.set(false)}
      transition:fly|global={{ duration: 400, x: 500 }}
    >
      <X></X>
    </button>
    <Description {title} {githubLink}><slot /></Description>
  </div>
{/if}
