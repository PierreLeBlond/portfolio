<script lang="ts">
  import { page } from "$app/stores";
  import CubeViewer from "$lib/content/drawings/CubeViewer.svelte";
  import DescriptionPanel from "$lib/components/description/DescriptionPanel.svelte";
  import { pageDialog } from "$lib/stores/pageDialog";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  $: urls = $page.data["urls"] || [];
  $: texts = $page.data["texts"] || [];
  $: pageIndex = $page.data["pageIndex"];

  let text: string | null;
  $: pageDialog.set(text);

  onDestroy(() => {
    pageDialog.set(null);
  });
</script>

<div class="relative top-0 flex h-[90%] items-center justify-center">
  <div
    class="absolute flex aspect-square w-[90%] items-center justify-center large:pr-[25%] square:aspect-auto square:h-full square:w-full"
  >
    <CubeViewer {urls} {texts} {pageIndex} bind:text />
  </div>
</div>

<DescriptionPanel title="Drawings">
  <div class="flex flex-col items-center justify-center gap-y-2">
    <p>
      Here are some drawing I made<br />
      with black ink.
    </p>
    <p>
      This cubic image viewer is made<br />
      with css.
    </p>
    <p>The current drawing is named</p>
    {#key text}
      <p class="self-center font-bold" in:fade>{text}</p>
    {/key}
  </div>
</DescriptionPanel>
