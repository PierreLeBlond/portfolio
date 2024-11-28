<script lang="ts">
  import { mod } from "$lib/content/drawings/util";
  import { ArrowLeftCircle, ArrowRightCircle } from "lucide-svelte";

  interface Props {
    scrollKey: string;
    screenshots: string[];
  }

  let { scrollKey, screenshots }: Props = $props();

  let element: HTMLDivElement | null = $state(null);
  let elementWidth: number = $state(0);
  const scrollToScreenshot = (offset: number) => {
    if (!element) {
      return;
    }
    const scrollLeft = element.scrollLeft;
    const index = Math.floor(scrollLeft / elementWidth);
    const nextIndex = mod(index + offset, screenshots.length);
    if (element) {
      element.scrollTo(nextIndex * elementWidth, 0);
    }
  };
</script>

<div
  class="relative flex max-w-96 justify-center overflow-x-hidden rounded-xl bg-stone-700/20"
>
  <div
    class="flex aspect-[2/3] h-full max-w-full snap-x snap-mandatory overflow-x-auto scroll-smooth horizontal:aspect-[1.5]"
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
          class="m-0 aspect-[0.45] h-full shadow-lg"
        />
      </div>
    {/each}
  </div>
  <div
    class="pointer-events-none absolute flex aspect-[1.5] h-full max-w-full justify-between"
  >
    <div class="left-0 top-0 flex h-full w-[20%] items-center justify-center">
      <button
        class="pointer-events-auto"
        onclick={() => scrollToScreenshot(-1)}
        aria-label="previous screenshot"
      >
        <ArrowLeftCircle></ArrowLeftCircle>
      </button>
    </div>
    <div class="right-0 top-0 flex h-full w-[20%] items-center justify-center">
      <button
        class="pointer-events-auto"
        onclick={() => scrollToScreenshot(1)}
        aria-label="next screenshot"
      >
        <ArrowRightCircle></ArrowRightCircle>
      </button>
    </div>
  </div>
</div>
