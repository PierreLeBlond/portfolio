<script lang="ts">
  import type { Snippet } from "svelte";
  import { run } from "svelte/legacy";

  interface Props {
    // Content ratio we want to preserve
    ratio: number;
    boxWidth?: number;
    boxHeight?: number;
    children: Snippet;
  }

  let {
    ratio,
    boxWidth = $bindable(0),
    boxHeight = $bindable(0),
    children,
  }: Props = $props();

  let clientWidth: number = $state(0);
  let clientHeight: number = $state(0);
  let clientRatio = $derived(clientWidth / clientHeight);

  // Should the content fill the full height or the full width ?
  let vertical = $derived(clientRatio < ratio);

  $effect(() => {
    boxWidth = vertical ? clientWidth : clientHeight * ratio;
  });
  $effect(() => {
    boxHeight = vertical ? clientWidth / ratio : clientHeight;
  });
</script>

<div
  bind:clientWidth
  bind:clientHeight
  class="relative flex h-full w-full items-center justify-center"
>
  <div style:width={`${boxWidth}px`} style:height={`${boxHeight}px`}>
    {@render children()}
  </div>
</div>
