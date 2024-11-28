<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { getAppContext } from "$lib/context/appContext";
  import { QUESTS_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";

  export let data: PageData;

  // Avoid revealing the iframe before it's fully loaded
  let unmask = false;

  let app = getAppContext();

  onMount(async () => {
    app.trigger("load");
  });

  const handleLoaded = () => {
    app.trigger("loaded");
    unmask = true;
  };
</script>

<Project
  title={QUESTS_LABEL}
  githubLink="https://github.com/PierreLeBlond/quests"
  link="https://quests.pierrelespingal.com"
  screenshots={data.urls}
>
  {#snippet project()}
    <div
      class="pointer-events-auto relative h-full w-full"
      out:fade|global={{
        duration: 1 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */,
      }}
    >
      <Mask columns={6} frames={30} loaded={unmask}>
        <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
          <div class="h-full w-full scale-90">
            <iframe
              on:load={handleLoaded}
              title="quests"
              src="https://quests.pierrelespingal.com"
              class="h-full w-full rounded-lg bg-stone-100"
            ></iframe>
          </div>
        </RatioBox>
      </Mask>
    </div>
  {/snippet}

  {#snippet about()}
    <div class="flex flex-col">
      {#if app.state === "idle"}
        <p>
          It's a todo app. Nothing fancy or original. Perheaps seeing todo's as
          quests helps finding the determination to complete them. When you
          aren't logged in, your data do persist in your local storage. Under
          the hood, there's some <b>react</b> involved.
        </p>
      {:else}
        <p>Going on an adventure...</p>
      {/if}
    </div>
  {/snippet}
</Project>
