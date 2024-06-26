<script lang="ts">
  // Content ratio we want to preserve
  export let ratio: number;

  export let boxWidth: number = 0;
  export let boxHeight: number = 0;

  let clientWidth: number;
  let clientHeight: number;
  $: clientRatio = clientWidth / clientHeight;

  // Should the content fill the full height or the full width ?
  $: vertical = clientRatio < ratio;

  $: boxWidth = vertical ? clientWidth : clientHeight * ratio;
  $: boxHeight = vertical ? clientWidth / ratio : clientHeight;
</script>

<div
  bind:clientWidth
  bind:clientHeight
  class="relative flex h-full w-full items-center justify-center"
>
  <div style:width={`${boxWidth}px`} style:height={`${boxHeight}px`}>
    <slot />
  </div>
</div>
