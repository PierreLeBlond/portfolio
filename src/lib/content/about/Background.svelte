<script lang="ts">
  export let scroll: number;
  export let totalHeight: number;

  const totalWidth = 3000;

  $: offset = (scroll * totalWidth) / totalHeight;
</script>

<div class="fixed bottom-0 left-0 w-screen">
  <div
    style:width={`${totalWidth}px`}
    style:left={`-${offset}px`}
    class="relative h-96 bg-gradient-to-r from-indigo-500"
  />
</div>
