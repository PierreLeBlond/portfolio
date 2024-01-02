<script lang="ts">
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import { elasticOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import imagePath1 from "./images/story-comic-1.png";
  import imagePath2 from "./images/story-comic-2.png";
  import imagePath3 from "./images/story-comic-3.png";
  import imagePath4 from "./images/story-comic-4.png";
  import imagePath5 from "./images/story-comic-5.png";
  import imagePath6 from "./images/story-comic-6.png";

  export let time: number;
  export let speed: number;

  const duration = 1.2;

  let width: number = 0;
  let height: number = 0;

  // End by flying top
  $: end = time - duration;
  $: top = end > 0 ? -end * speed : 0;

  $: panels = [
    {
      text: {
        value: "When",
        x: 0,
        y: 30,
        width: 100,
      },
      image: {
        path: imagePath1,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      },
      transition: { x: -width / 3 },
    },
    {
      text: {
        value: "I was",
        x: -17,
        y: 30,
        width: 100,
      },
      image: {
        path: imagePath2,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      },
      transition: { y: -height / 2 },
    },
    {
      text: {
        value: "a child",
        x: -10,
        y: 64,
        width: 100,
      },
      image: {
        path: imagePath3,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      },
      transition: { x: width / 3 },
    },
    {
      text: {
        value: "I wanted",
        x: 10,
        y: 73,
        width: 100,
      },
      image: {
        path: imagePath4,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      },
      transition: { x: -width / 3 },
    },
    {
      text: {
        value: "to be",
        x: 18,
        y: 70,
        width: 5,
      },
      image: {
        path: imagePath5,
        width: 100,
        height: 142,
        x: 0,
        y: 0,
      },
      transition: { y: height / 2 },
    },
    {
      text: {
        value: "a comic book artist.",
        x: 16,
        y: 68,
        width: 40,
      },
      image: {
        path: imagePath6,
        width: 138,
        height: 155,
        x: -36,
        y: -23,
      },
      transition: {
        x: width / 2,
        y: height / 1.5,
        easing: elasticOut,
        duration: 1000,
      },
    },
  ];
</script>

<RatioBox ratio={16 / 9}>
  <div
    bind:clientWidth={width}
    bind:clientHeight={height}
    style:top={`${top}px`}
    class="relative grid h-full w-full grid-cols-3 grid-rows-2 gap-4 px-64 py-36 text-black"
  >
    {#each panels as panel, i}
      <div class="relative">
        {#if time > i * 0.2}
          <div
            style:background-image={`url(${panel.image.path})`}
            style:width={`${panel.image.width}%`}
            style:height={`${panel.image.height}%`}
            style:top={`${panel.image.y}%`}
            style:left={`${panel.image.x}%`}
            class="relative flex items-center justify-center bg-contain bg-center bg-no-repeat"
            transition:fly={{ opacity: 1, ...panel.transition }}
          >
            <p
              class="absolute text-center"
              style:bottom={`${panel.text.y}%`}
              style:left={`${panel.text.x}%`}
              style:width={`${panel.text.width}%`}
            >
              {panel.text.value.toUpperCase()}
            </p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</RatioBox>
