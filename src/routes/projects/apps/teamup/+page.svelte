<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { TEAMUP_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";
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
  title={TEAMUP_LABEL}
  githubLink="https://github.com/PierreLeBlond/teamup"
  link="https://teamup-app.fly.dev/tournaments/1"
  screenshots={data.screenshots}
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
            title="teamup"
            src="https://teamup-app.fly.dev/tournaments/1"
            class="h-full w-full rounded-lg bg-stone-100"
          />
        </div>
      </RatioBox>
    </Mask>
  </div>

  <div slot="about">
    {#if $appState === "idle"}
      <p transition:fade>
        An app to manage teams and score within an olympiad or a tournament.<br
        />
        Create multiple games, and auto-generate the teams before each game.<br
        />
        The app will teamup players based on their current score, to build fair and
        balanced teams.<br />
        It's build with <b>c# & asp.net technologies.</b>
      </p>
    {:else}
      <p>Generating teams...</p>
    {/if}
  </div>
</Project>
