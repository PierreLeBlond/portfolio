<script lang="ts">
  import { Github } from "lucide-svelte";
  import { fly } from "svelte/transition";

  export let title: string;
  export let githubLink: string | null = null;
</script>

<h1
  class="absolute left-1/2 top-24 flex h-32 w-32 -translate-x-32 items-center justify-center rounded-full bg-gradient-radial from-stone-100/60 via-stone-100/60 to-stone-100 p-4 text-center text-xl font-bold text-stone-900 shadow-md backdrop-blur-md sm:-translate-x-64"
  transition:fly|global={{ duration: 400, x: 500 }}
>
  {title}
</h1>
{#if githubLink}
  <a
    class="pointer-events-auto absolute left-1/2 top-40 flex translate-x-12 rounded-full bg-stone-200 p-2 text-stone-700 shadow-lg sm:-translate-x-24 large:p-3"
    href={githubLink}
    target="_blank"
    transition:fly|global={{ duration: 400, x: 500, delay: 200 }}
  >
    <Github></Github>
  </a>
{/if}
<div
  class="pointer-events-auto absolute left-1/2 top-1/3 flex h-72 w-72 -translate-x-36 items-center justify-center rounded-full bg-gradient-radial from-stone-100/60 via-stone-100/60 to-stone-100 p-12 text-xs text-stone-800 shadow-md backdrop-blur-md sm:h-96 sm:w-96 sm:-translate-x-48 sm:text-base"
  transition:fly|global={{ duration: 400, x: 500, delay: 100 }}
>
  <slot />
</div>
