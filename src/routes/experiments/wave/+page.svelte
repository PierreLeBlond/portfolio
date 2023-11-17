<script lang="ts">
  import WaveMonsterCollapse from "@s0rt/wave-monster-collapse";
  import Mask from "./Mask.svelte";
  import mask from "./mask.png";
  import Description from "$lib/layout/Description.svelte";
  import { fade } from "svelte/transition";

  let offsetHeight: number;
</script>

<div
  bind:offsetHeight
  class="relative h-full w-full"
  out:fade|global={{
    duration: 0 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
  }}
>
  <Mask url={mask} columns={5} frames={24} size={offsetHeight}>
    <div class="relative top-0 flex h-[90%] items-center justify-center">
      <div
        class="absolute flex aspect-square w-[90%] items-center justify-center large:pr-[25%] square:aspect-auto square:h-full square:w-full"
      >
        <WaveMonsterCollapse />
      </div>
    </div>
  </Mask>
</div>

<Description>
  <div class="flex h-full w-full flex-col gap-y-4 p-4">
    <h1 class="text-2xl font-bold">Algorythm</h1>
    <h2 class="self-end pb-4 text-xl">Wave monster collapse</h2>
    <p>Typescript implementation of the wave function collapse algorythm.</p>
    <p>
      Based on <a
        class="text-stone-100"
        href="https://github.com/mxgmn/WaveFunctionCollapse"
      >
        Maxim Gumin implementation
      </a>
    </p>
  </div>
</Description>
