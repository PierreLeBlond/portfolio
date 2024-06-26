<script lang="ts">
  import WaveMonsterCollapse from "@s0rt/wave-monster-collapse";
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { VERTICAL_RATIO_LIMIT } from "../../../../constants";

  let boxWidth: number;
  let boxHeight: number;
</script>

<Project
  title="Wave function collapse"
  githubLink="https://github.com/PierreLeBlond/wave-monster-collapse"
>
  <div
    class="relative h-full w-full"
    out:fade|global={{
      duration: 0 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
    }}
    slot="project"
  >
    <RatioBox ratio={VERTICAL_RATIO_LIMIT} bind:boxWidth bind:boxHeight>
      <Mask
        columns={6}
        frames={30}
        width={boxWidth}
        height={boxHeight}
        loaded={true}
      >
        <div class="h-full w-full scale-90 bg-stone-300">
          <WaveMonsterCollapse />
        </div>
      </Mask>
    </RatioBox>
  </div>

  <div class="flex flex-col" slot="hud">
    <p>That's an implementation of the wave function algorythm.</p>
  </div>
</Project>
