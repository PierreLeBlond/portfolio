<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { TEAMUP_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { getAppContext } from "$lib/context/appContext";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let app = getAppContext();

  // Avoid revealing the iframe before it's fully loaded
  let unmask = $state(false);

  onMount(async () => {
    app.trigger("load");
  });

  const handleLoaded = () => {
    app.trigger("loaded");
    unmask = true;
  };
</script>

<Project
  title={TEAMUP_LABEL}
  githubLink="https://github.com/PierreLeBlond/teamup"
  link="https://teamup-app.fly.dev/tournaments/1"
  screenshots={data.screenshots}
>
  {#snippet project()}
    <div
      class="relative h-full w-full"
      out:fade|global={{
        duration: 1 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
      }}
    >
      <Mask columns={6} frames={30} loaded={unmask}>
        <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
          <div class="h-full w-full scale-90">
            <iframe
              onload={handleLoaded}
              title="teamup"
              src="https://teamup-app.fly.dev/tournaments/1"
              class="h-full w-full rounded-lg bg-stone-100"
            ></iframe>
          </div>
        </RatioBox>
      </Mask>
    </div>
  {/snippet}

  {#snippet about()}
    <div>
      {#if app.state === "idle"}
        <p transition:fade={{ delay: 1 }}>
          An app to manage teams and score within an olympiad or a tournament.<br
          />
          Create multiple games, and auto-generate the teams before each game.<br
          />
          The app will teamup players based on their current score, to build fair
          and balanced teams.<br />
          It's build with <b>c# & asp.net technologies.</b>
        </p>
      {:else}
        <p>Generating teams...</p>
      {/if}
    </div>
  {/snippet}
</Project>
