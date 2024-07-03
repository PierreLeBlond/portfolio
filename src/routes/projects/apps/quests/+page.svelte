<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { VERTICAL_RATIO_LIMIT } from "../../../../constants";
  import { onMount } from "svelte";
  import { appEvent } from "$lib/state/appEvent";
  import { appState } from "$lib/state/appState";

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
  title="Quests"
  githubLink="https://github.com/PierreLeBlond/quests"
  link="https://quests.pierrelespingal.com"
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
            title="quests"
            src="https://quests.pierrelespingal.com"
            class="h-full w-full bg-stone-100"
          />
        </div>
      </Mask>
    </RatioBox>
  </div>

  <div class="flex flex-col" slot="hud">
    {#if $appState === "idle"}
      <p>It's a todo app. Nothing fancy or original.</p>
      <p>
        Perheaps seeing todo's as quests helps in finding the determination to
        complete them.
      </p>
      <p>
        When you are'nt logged in, your data do persist in your local storage.
        Handy, but who will clean them after that ?
      </p>
      <p>
        Under the hood, there's some <b>react</b> involved.
      </p>
    {:else}
      <p>Going on an adventure...</p>
    {/if}
  </div>
</Project>
