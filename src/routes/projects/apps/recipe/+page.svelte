<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { VERTICAL_RATIO_LIMIT } from "../../../../constants";
  import { appState } from "$lib/state/appState";
  import { appEvent } from "$lib/state/appEvent";
  import { onMount } from "svelte";

  let boxWidth: number;
  let boxHeight: number;

  // Avoid revealing the iframe before it's fully loaded
  let unmask = false;

  onMount(async () => {
    appEvent.set("load");
  });

  const handleLoaded = () => {
    appEvent.set("loaded");
    unmask = true;
  };
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
    <RatioBox ratio={VERTICAL_RATIO_LIMIT} bind:boxWidth bind:boxHeight>
      <Mask
        columns={6}
        frames={30}
        width={boxWidth}
        height={boxHeight}
        loaded={unmask}
      >
        <div class="h-full w-full scale-90">
          <iframe
            on:load={handleLoaded}
            title="recipes"
            src="https://recipes.pierrelespingal.com"
            class="h-full w-full bg-stone-100"
          />
        </div>
      </Mask>
    </RatioBox>
  </div>

  <div class="flex flex-col" slot="hud">
    {#if $appState === "idle"}
      <p>Some recipes.</p>
      <p>In french, obviously.</p>
    {:else}
      <p>Cooking...</p>
    {/if}
  </div>
</Project>
