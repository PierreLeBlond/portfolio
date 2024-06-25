<script lang="ts">
  import DescriptionPanel from "$lib/components/hud/Hud.svelte";
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import Project from "$lib/components/Project.svelte";

  let boxWidth: number;
  let boxHeight: number;

  // Avoid revealing the iframe before it's fully loaded
  let loaded = false;
</script>

<Project
  title="App"
  githubLink="https://github.com/PierreLeBlond/recipes"
  link="https://recipes.pierrelespingal.com"
>
  <div
    class="relative h-full w-full"
    out:fade|global={{
      duration: 0 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
    }}
    slot="project"
  >
    <Mask columns={6} frames={30} width={boxWidth} height={boxHeight} {loaded}>
      <div class="flex h-full w-full justify-center">
        <RatioBox ratio={112.5 / 157.5} bind:boxWidth bind:boxHeight>
          <div class="h-full w-full scale-90">
            <iframe
              on:load={() => (loaded = true)}
              title="recipes"
              src="https://recipes.pierrelespingal.com"
              class="h-full w-full bg-stone-100"
            />
          </div>
        </RatioBox>
      </div>
    </Mask>
  </div>

  <div class="flex flex-col" slot="hud">
    {#if loaded}
      <p>Some recipes.</p>
      <p>In french, obviously.</p>
    {/if}
  </div>
</Project>
