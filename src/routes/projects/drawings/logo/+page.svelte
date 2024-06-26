<script lang="ts">
  import { page } from "$app/stores";
  import Project from "$lib/components/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import CubeViewer from "$lib/content/drawings/CubeViewer.svelte";
  import { fade } from "svelte/transition";
  import { VERTICAL_RATIO_LIMIT } from "../../../../constants";

  $: urls = $page.data["urls"] || [];
  $: texts = $page.data["texts"] || [];
  $: pageIndex = $page.data["pageIndex"];

  let text: string | null;
</script>

<Project title="Another cube">
  <div class="relative h-full w-full" slot="project">
    <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
      <div class="h-[90%]">
        <CubeViewer {urls} {texts} {pageIndex} bind:text />
      </div>
    </RatioBox>
  </div>

  <div class="flex w-full flex-col" slot="hud">
    <p>Another cube. It also rotates if you drag it.</p>
    <p>Though, the inscription on it looks like they were made numerically.</p>
    <p>
      Without doubt with open source software such as Inkscape, Gimp or Krita.
    </p>
    <p>
      This one seems to represent {#key text}
        <b in:fade>
          {text}
        </b>
      {/key}.
    </p>
  </div>
  <div slot="excerpt">
    <p class="flex justify-center">
      {#key text}
        <b in:fade>
          {text}
        </b>
      {/key}
    </p>
  </div>
</Project>
