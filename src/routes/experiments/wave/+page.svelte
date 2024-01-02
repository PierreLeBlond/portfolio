<script lang="ts">
  import WaveMonsterCollapse from "@s0rt/wave-monster-collapse";
  import Mask from "./Mask.svelte";
  import mask from "./mask.png";
  import DescriptionPanel from "$lib/components/description/DescriptionPanel.svelte";
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

<DescriptionPanel
  title="Algo"
  githubLink="https://github.com/PierreLeBlond/wave-monster-collapse"
>
  <div class="flex flex-col items-center justify-center gap-y-2">
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
</DescriptionPanel>
