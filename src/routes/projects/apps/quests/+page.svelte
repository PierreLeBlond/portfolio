<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { QUESTS_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";
  import { onMount } from "svelte";
  import { appEvent } from "$lib/state/appEvent";
  import { appState } from "$lib/state/appState";
  import type { PageData } from "./$types";

  export let data: PageData;

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
  title={QUESTS_LABEL}
  githubLink="https://github.com/PierreLeBlond/quests"
  link="https://quests.pierrelespingal.com"
  screenshots={data.urls}
>
  <div
    class="relative h-full w-full"
    out:fade|global={{
      duration: 0 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
    }}
    slot="project"
  >
    <Mask columns={6} frames={30} loaded={unmask}>
      <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
        <div class="h-full w-full scale-90">
          <iframe
            on:load={handleLoaded}
            title="quests"
            src="https://quests.pierrelespingal.com"
            class="h-full w-full rounded-lg bg-stone-100"
          />
        </div>
      </RatioBox>
    </Mask>
  </div>

  <div class="flex flex-col" slot="about">
    {#if $appState === "idle"}
      <p>It's a todo app. Nothing fancy or original.</p>
      <p>
        Perheaps seeing todo's as quests helps finding the determination to
        complete them.
      </p>
      <p>
        When you aren't logged in, your data do persist in your local storage.
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
