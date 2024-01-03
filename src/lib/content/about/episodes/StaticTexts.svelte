<script lang="ts">
  import { fade } from "svelte/transition";
  export let staticTimedTexts: { text: string; time: number }[];
  export let time: number;

  const staticThreshold = 0.2;
</script>

<ul
  class="pointer-events-none fixed left-0 top-0 flex h-full w-full items-center justify-center pl-32 text-2xl"
>
  {#each staticTimedTexts as staticTimedText}
    {#if Math.abs(time - staticTimedText.time) < staticThreshold}
      <li
        class="absolute box-content w-1/2 text-center"
        in:fade={{
          duration: 1000,
        }}
        out:fade={{
          duration: 500,
        }}
      >
        {staticTimedText.text}
      </li>
    {/if}
  {/each}
</ul>
