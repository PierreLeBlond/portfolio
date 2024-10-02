<script lang="ts">
  import { fade } from "svelte/transition";
  import Mask from "$lib/content/app/Mask.svelte";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { USTOM_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";
  import { appState } from "$lib/state/appState";
  import { appEvent } from "$lib/state/appEvent";
  import { onMount } from "svelte";

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
  title={USTOM_LABEL}
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
    <Mask columns={6} frames={30} loaded={unmask}>
      <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
        <div class="h-full w-full scale-90">
          <iframe
            on:load={handleLoaded}
            title="ustom"
            src="https://ustom.pierrelespingal.com/?encryptedWord=158ae1b0d188&iv=a62f76eb217e47f158688e579c00209b"
            class="h-full w-full rounded-lg bg-stone-100"
          />
        </div>
      </RatioBox>
    </Mask>
  </div>

  <div class="flex flex-col" slot="about">
    {#if $appState === "idle"}
      <p>It's a clone of wordle.</p>
      <p>It has a leaderboard, as well as a word generator.</p>
      <p>It is also made with <b>svelte</b>, neat.</p>
    {:else}
      <p>Thinking of a word...</p>
    {/if}
  </div>
</Project>
