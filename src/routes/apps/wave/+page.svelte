<script lang="ts">
  import WaveMonsterCollapse from "@s0rt/wave-monster-collapse";
  import DescriptionPanel from "$lib/components/description/DescriptionPanel.svelte";
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";

  let boxWidth: number;
  let boxHeight: number;
</script>

<div
  class="relative h-full w-full"
  out:fade|global={{
    duration: 0 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
  }}
>
  <Mask name="Wave" columns={6} frames={30} width={boxWidth} height={boxHeight}>
    <div class="flex h-full w-full justify-center">
      <div class="flex h-full w-full justify-center large:pr-[25%]">
        <RatioBox ratio={112.5 / 157.2} bind:boxWidth bind:boxHeight>
          <div class="h-full w-full scale-95 bg-stone-100">
            <WaveMonsterCollapse />
          </div>
        </RatioBox>
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
        class="font-bold text-stone-900 underline"
        href="https://github.com/mxgmn/WaveFunctionCollapse"
      >
        Maxim Gumin implementation
      </a>
    </p>
  </div>
</DescriptionPanel>
