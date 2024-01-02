<script lang="ts">
  import { page } from "$app/stores";
  import DescriptionPanel from "$lib/components/description/DescriptionPanel.svelte";
  import CubeViewer from "$lib/content/drawings/CubeViewer.svelte";
  import { fade } from "svelte/transition";

  $: urls = $page.data["urls"] || [];
  $: texts = $page.data["texts"] || [];
  $: pageIndex = $page.data["pageIndex"];

  let text: string | null;
</script>

<div class="relative top-0 flex h-[90%] items-center justify-center">
  <div
    class="absolute flex aspect-square w-[90%] items-center justify-center large:pr-[25%] square:aspect-auto square:h-full square:w-full"
  >
    <CubeViewer {urls} {texts} {pageIndex} bind:text />
  </div>
</div>

<DescriptionPanel title="Logos">
  <div class="flex flex-col items-center justify-center gap-y-2">
    <p>
      From time to time I try numeric art, <br />
      using open source software, <br />
      to design logos. <br />
      I'd use Gimp, Inkscape & Krita.
    </p>
    <p>This one is for</p>
    {#key text}
      <p class="self-center font-bold" in:fade>
        {text}
      </p>
    {/key}
  </div>
</DescriptionPanel>
