<script lang="ts">
  import WaveMonsterCollapse from "@s0rt/wave-monster-collapse";
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { VERTICAL_RATIO_LIMIT, WAVE_LABEL } from "../../../../constants";
</script>

<Project
  title={WAVE_LABEL}
  githubLink="https://github.com/PierreLeBlond/wave-monster-collapse"
>
  {#snippet project()}
    <div
      class="pointer-events-auto relative h-full w-full"
      out:fade|global={{
        duration: 1 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
      }}
    >
      <Mask columns={6} frames={30} loaded={true}>
        <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
          <div class="h-full w-full scale-90 rounded-lg bg-stone-300">
            <WaveMonsterCollapse />
          </div>
        </RatioBox>
      </Mask>
    </div>
  {/snippet}

  {#snippet about()}
    <div class="flex flex-col">
      <p>That's an implementation of the wave function algorythm.</p>
    </div>
  {/snippet}
</Project>
