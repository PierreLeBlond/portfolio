<script lang="ts">
  import { page } from "$app/stores";
  import CubeViewer from "$lib/content/drawings/CubeViewer.svelte";
  import { pageDialog } from "$lib/stores/pageDialog";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import Project from "$lib/components/project/Project.svelte";
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { INK_LABEL, VERTICAL_RATIO_LIMIT } from "../../../../constants";

  $: urls = $page.data["urls"] || [];
  $: texts = $page.data["texts"] || [];
  $: pageIndex = $page.data["pageIndex"];

  let text: string | null;
  $: pageDialog.set(text);

  onDestroy(() => {
    pageDialog.set(null);
  });
</script>

<Project title={INK_LABEL}>
  <div class="relative h-full w-full" slot="project">
    <RatioBox ratio={VERTICAL_RATIO_LIMIT}>
      <div class="h-[90%]">
        <CubeViewer {urls} {texts} {pageIndex} bind:text />
      </div>
    </RatioBox>
  </div>

  <div class="flex w-full flex-col" slot="about">
    <p>A cube that rotate if you drag it.</p>
    <p>On each face there is a drawing, probably made with black ink.</p>
    <p>
      After further investigation, you found out that the cube is made with <b
        >css</b
      >.
    </p>
    <p>
      You inexpicably want to title that drawing {#key text}<b in:fade
          >"{text}"</b
        >{/key}.
    </p>
  </div>
  <div slot="excerpt">
    <p class="flex justify-center">
      {#key text}<b in:fade>{text}</b>{/key}
    </p>
  </div>
</Project>
