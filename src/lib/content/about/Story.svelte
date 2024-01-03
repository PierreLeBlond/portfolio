<script lang="ts">
  import { fade } from "svelte/transition";
  import Comic from "./episodes/comic/Comic.svelte";
  import Board from "./episodes/board/Board.svelte";
  //import DynamicTexts from './episodes/DynamicTexts.svelte';
  //import StaticTexts from './episodes/StaticTexts.svelte';
  //import { texts } from './texts';

  export let height: number;
  export let scroll: number;

  $: scrollCenter = scroll + height / 2;

  const scaleFactor = 0.5;

  // Achieve parallax effect / scroll speed control
  $: scaledScrollCenter = scaleFactor * scrollCenter;
  //$: topOffset = scrollCenter - scaledScrollCenter;

  // Now we are thinking v=d/t, as if scrolling controls an animation time
  $: speed = height / 1;
  $: time = scaledScrollCenter / speed;

  const duration = 10;

  //const timedTexts = texts.map((text, i) => ({
  //...text,
  //time: (i + 1) * 50 * 0.01
  //}));
  //const numberOfTexts = texts.length;

  // Compute the actual total height needed to match modified scroll speed
  //const heightInPercentage = ((numberOfTexts + 0.2) * 50) / scaleFactor;

  //const staticTimedTexts = timedTexts.filter((text) => text.static);
  //const dynamicTimedTexts = timedTexts.filter((text) => !text.static);

  const episodes = [
    {
      component: Comic,
      start: 1,
      duration: 1.2,
    },
    {
      component: Board,
      start: 2.2,
      duration: 1,
    },
  ];
</script>

<div
  style:opacity={1 + scroll / height}
  class="pointer-events-none absolute h-full w-full"
>
  <div
    style:box-shadow={"inset 0 0 12em 7em hsla(0 0% 0% / 0.2)"}
    class="fixed left-0 top-0 h-screen w-screen bg-gray-100"
    out:fade|global
  />
</div>

<!--StaticTexts
  {staticTimedTexts}
  {time}
/-->

<!--DynamicTexts
  {time}
  {speed}
  {topOffset}
  {heightInPercentage}
  {dynamicTimedTexts}
/-->

<div
  style:height={`${duration * speed}px`}
  style:font-family={"Comic Neue"}
  class="absolute w-full border border-red-700 text-3xl"
>
  {#each episodes as episode}
    <div class="pointer-events-none fixed left-0 top-0 h-screen w-screen">
      <svelte:component
        this={episode.component}
        time={time - episode.start}
        {speed}
      />
    </div>
  {/each}
</div>
