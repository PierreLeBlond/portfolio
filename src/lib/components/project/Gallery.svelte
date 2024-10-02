<script lang="ts">
  import { mod } from "$lib/content/drawings/util";
  import { ArrowLeftCircle, ArrowRightCircle } from "lucide-svelte";

  export let scrollKey: string;
  export let screenshots: string[] = [];

  let element: HTMLDivElement;
  let elementWidth: number;
  const scrollToScreenshot = (offset: number) => {
    const scrollLeft = element.scrollLeft;
    const index = Math.floor(scrollLeft / elementWidth);
    const nextIndex = mod(index + offset, screenshots.length);
    if (element) {
      element.scrollTo(nextIndex * elementWidth, 0);
    }
  };
</script>

<div class="relative flex grow justify-center overflow-x-hidden">
  <div
    class="flex aspect-[1.5] h-full max-w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
    bind:this={element}
    bind:clientWidth={elementWidth}
  >
    {#each screenshots as screenshot, index}
      <div
        class="flex h-full min-w-full snap-start justify-center py-4"
        id="screenshot-{index}-{scrollKey}"
      >
        <img
          src={screenshot}
          alt="teamup screenshot"
          class="aspect-[0.45] h-full shadow-lg"
        />
      </div>
    {/each}
  </div>
  <div
    class="pointer-events-none absolute flex aspect-[1.5] h-full max-w-full justify-between"
  >
    <div
      class="left-0 top-0 flex h-full w-[20%] items-center justify-start bg-gradient-to-r from-stone-100 via-stone-100 to-stone-100/0"
    >
      <button
        class="pointer-events-auto"
        on:click={() => scrollToScreenshot(-1)}
        aria-label="previous screenshot"
      >
        <ArrowLeftCircle></ArrowLeftCircle>
      </button>
    </div>
    <div
      class="right-0 top-0 flex h-full w-[20%] items-center justify-end bg-gradient-to-l from-stone-100 via-stone-100 to-stone-100/0"
    >
      <button
        class="pointer-events-auto"
        on:click={() => scrollToScreenshot(1)}
        aria-label="next screenshot"
      >
        <ArrowRightCircle></ArrowRightCircle>
      </button>
    </div>
  </div>
</div>
