<script lang="ts">
  import { fade } from 'svelte/transition';
  export let staticTimedTexts: { text: string; time: number }[];
  export let time: number;

  const staticThreshold = 0.2;
</script>

<ul class="fixed w-full h-full top-0 left-0 flex items-center justify-center pl-32 pointer-events-none text-2xl">
  {#each staticTimedTexts as staticTimedText}
    {#if Math.abs(time - staticTimedText.time) < staticThreshold}
      <li
        class="absolute box-content w-1/2 text-center"
        in:fade={{
          duration: 1000
        }}
        out:fade={{
          duration: 500
        }}
      >
        {staticTimedText.text}
      </li>
    {/if}
  {/each}
</ul>
