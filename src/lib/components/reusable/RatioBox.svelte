<script lang="ts">
  // Content ratio we want to preserve
  export let ratio: number;

  export let boxWidth: number = 0;
  export let boxHeight: number = 0;

  let wrapperWidth: number;
  let wrapperHeight: number;
  $: wrapperRatio = wrapperWidth / wrapperHeight;

  // Should the content fill the full height or the full width ?
  $: vertical = wrapperRatio < ratio;

  $: boxWidth = vertical ? wrapperWidth : wrapperHeight * ratio;
  $: boxHeight = vertical ? wrapperWidth / ratio : wrapperHeight;
</script>

<div
  bind:clientWidth={wrapperWidth}
  bind:clientHeight={wrapperHeight}
  class="relative flex h-full w-full items-center justify-center"
>
  <div
    style:width={`${boxWidth}px`}
    style:height={`${boxHeight}px`}
    class="relative"
  >
    <slot />
  </div>
</div>
