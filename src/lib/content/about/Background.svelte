<script lang="ts">
  export let scroll: number;
  export let totalHeight: number;

  let width: number;
  const totalWidth = 3000;

  $: offset = (scroll * totalWidth) / totalHeight;
</script>

<div
  bind:clientWidth={width}
  class="fixed w-screen bottom-0 left-0"
>
  <div
    style:width={`${totalWidth}px`}
    style:left={`-${offset}px`}
    class="relative h-96 bg-gradient-to-r from-indigo-500"
  />
</div>
