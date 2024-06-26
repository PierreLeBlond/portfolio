<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { VERTICAL_RATIO_LIMIT } from "../../../../constants";

  let boxWidth: number;
  let boxHeight: number;

  // Avoid revealing the iframe before it's fully loaded
  let loaded = false;
</script>

<Project
  title="Ustom"
  githubLink="https://github.com/PierreLeBlond/ustom"
  link="https://ustom.pierrelespingal.com/?encryptedWord=158ae1b0d188&iv=a62f76eb217e47f158688e579c00209b"
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
        {loaded}
      >
        <div class="h-full w-full scale-90">
          <iframe
            on:load={() => (loaded = true)}
            title="ustom"
            src="https://ustom.pierrelespingal.com/?encryptedWord=158ae1b0d188&iv=a62f76eb217e47f158688e579c00209b"
            class="h-full w-full bg-stone-100"
          />
        </div>
      </Mask>
    </RatioBox>
  </div>

  <div class="flex flex-col" slot="hud">
    <p>It's a clone of wordle.</p>
    <p>It has a leaderboard, as well as a word generator.</p>
    <p>It is also made with <b>svelte</b>, neat.</p>
  </div>
</Project>
