<script lang="ts">
  import { Github } from "lucide-svelte";

  export let title: string;
  export let subtitle: string;
  export let githubLink: string | null = null;
</script>

<div class="flex h-full w-full flex-col gap-y-4 p-4">
  <h1 class="text-2xl font-bold">{title}</h1>
  <div class="flex items-center justify-between">
    {#if githubLink}
      <a href={githubLink} target="_blank">
        <Github></Github>
      </a>
    {/if}
    <h2 class="w-full text-end text-xl">{subtitle}</h2>
  </div>
  <slot />
</div>
