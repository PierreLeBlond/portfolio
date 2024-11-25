<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { RECIPE_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";
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
  title={RECIPE_LABEL}
  githubLink="https://github.com/PierreLeBlond/recipes"
  link="https://recipes.pierrelespingal.com"
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
              title="recipes"
              src="https://recipes.pierrelespingal.com"
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
        <p>Some recipes.</p>
        <p>In french, obviously.</p>
      {:else}
        <p>Cooking...</p>
      {/if}
    </div>
  {/snippet}
</Project>
