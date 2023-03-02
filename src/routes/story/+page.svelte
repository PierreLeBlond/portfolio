<script lang="ts">
  import Story from '$lib/story/Story.svelte';

  let height: number;

  let wrapper: HTMLElement;
  let scroll = 0;

  const updateScroll = () => {
    scroll = wrapper.scrollTop;
  };
</script>

<div
  id="wrapper"
  bind:offsetHeight={height}
  style:-ms-overflow-style={'none'}
  style:scrollbar-width={'none'}
  class="relative w-full h-full overflow-y-scroll"
  bind:this={wrapper}
  on:scroll={updateScroll}
>
  <Story
    {height}
    scroll={scroll - height}
  />
</div>

<style>
  #wrapper::-webkit-scrollbar {
    display: none;
  }
</style>
