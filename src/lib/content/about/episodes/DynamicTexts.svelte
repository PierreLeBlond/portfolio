<script lang="ts">
  import { fly } from 'svelte/transition';

  export let time: number;
  export let speed: number;
  export let topOffset: number;
  export let heightInPercentage: number;
  export let dynamicTimedTexts: { text: string; time: number }[];

  const dynamicThreshold = 0.3;
</script>

<ul
  style:height={`${heightInPercentage}%`}
  class="relative w-full flex justify-center text-2xl border border-red-700"
>
  {#each dynamicTimedTexts as dynamicTimedText}
    {#if Math.abs(time - dynamicTimedText.time) < dynamicThreshold}
      <li
        style:top="{dynamicTimedText.time * speed + topOffset}px"
        class="absolute box-content w-1/2 text-center"
        in:fly={{
          duration: 1000,
          y: Math.sign(dynamicTimedText.time - time) * 0.1 * speed
        }}
        out:fly={{
          duration: 500,
          y: Math.sign(dynamicTimedText.time - time) * 0.1 * speed
        }}
      >
        {dynamicTimedText.text}
      </li>
    {/if}
  {/each}
</ul>
