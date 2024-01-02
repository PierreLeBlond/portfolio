<script lang="ts">
  // Content ratio we want to preserve
  export let ratio: number;

  let wrapperWidth: number;
  let wrapperHeight: number;
  $: wrapperRatio = wrapperWidth / wrapperHeight;

  // Should the content fill the full height or the full width ?
  $: vertical = wrapperRatio < ratio;

  $: width = vertical ? wrapperWidth : wrapperHeight * ratio;
  $: height = vertical ? wrapperWidth / ratio : wrapperHeight;
</script>

<div
  bind:clientWidth={wrapperWidth}
  bind:clientHeight={wrapperHeight}
  class="relative w-full h-full flex items-center justify-center"
>
  <div
    style:width={`${width}px`}
    style:height={`${height}px`}
    class="relative"
  >
    <slot />
  </div>
</div>
