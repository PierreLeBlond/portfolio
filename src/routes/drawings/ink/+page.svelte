<script lang="ts">
  import { page } from "$app/stores";
  import CubeViewer from "$lib/content/drawings/CubeViewer.svelte";
  import Description from "$lib/layout/Description.svelte";
  import { pageDialog } from "$lib/stores/pageDialog";
  import { onDestroy } from "svelte";

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

<Description>
  <div class="flex h-full w-full flex-col gap-y-4 p-4">
    <h1 class="text-2xl font-bold">Drawings</h1>
    <h2 class="self-end pb-4 text-xl">with black ink</h2>
    <p>A cube image viewer made with css !</p>
    <p>The current image is named</p>
    <p class="self-center font-bold">{text}</p>
  </div>
</Description>
