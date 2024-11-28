<script lang="ts">
  import { page } from "$app/stores";
  import { globalState } from "$lib/state/globalState.svelte";
  import { ArrowBigLeft, ArrowBigRight, Box, HelpCircle } from "lucide-svelte";
  import { fly } from "svelte/transition";

  type Props = {
    open: boolean;
  };

  let { open = $bindable() }: Props = $props();

  let pages = $derived($page.data["pages"]);

  let pageIndex = $derived(
    globalState.currentPage ? globalState.currentPage.index : -1,
  );

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  let previousIndex = $derived(
    pageIndex > -1 ? mod(pageIndex - 1, pages.length) : -1,
  );
  let nextIndex = $derived(
    pageIndex > -1 ? mod(pageIndex + 1, pages.length) : -1,
  );

  let previousPage = $derived(pages[previousIndex] ?? null);
  let nextPage = $derived(pages[nextIndex] ?? null);

  let previousHovered = $state(false);
  let nextHovered = $state(false);
  let homeHovered = $state(false);
</script>

<nav class="pointer-events-none absolute h-full w-full">
  {#if previousPage}
    <a
      href={previousPage.pathname}
      class="pointer-events-auto absolute bottom-0 left-0 flex -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-stone-300 p-2 shadow-md"
      onpointerenter={() => (previousHovered = true)}
      onpointerleave={() => (previousHovered = false)}
    >
      <ArrowBigLeft size={42} strokeWidth={3} absoluteStrokeWidth
      ></ArrowBigLeft>
      {#if previousHovered}
        <p
          class="absolute -translate-y-16 text-nowrap rounded-md bg-stone-200 px-2 py-1 shadow-sm"
          transition:fly|global={{ y: 20, delay: 1 }}
        >
          {previousPage.label}
        </p>
      {/if}
    </a>
  {/if}
  <a
    href="/"
    class="group pointer-events-auto absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-300 p-2 shadow-md"
    onpointerenter={() => (homeHovered = true)}
    onpointerleave={() => (homeHovered = false)}
  >
    <Box class="rotate-180" size={42} strokeWidth={3} absoluteStrokeWidth></Box>
    {#if homeHovered}
      <p
        class="absolute translate-y-16 text-nowrap rounded-md bg-stone-200 px-2 py-1 shadow-sm"
        transition:fly|global={{ y: -20, delay: 1 }}
      >
        home
      </p>
    {/if}
  </a>
  <button
    type="button"
    class="group pointer-events-auto absolute bottom-0 right-1/2 flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-stone-300 p-2 shadow-md horizontal:hidden"
    onclick={() => (open = !open)}
  >
    <HelpCircle
      size={42}
      strokeWidth={3}
      absoluteStrokeWidth
      class={`transition-transform ${open ? "rotate-180" : ""}`}
    ></HelpCircle>
  </button>
  {#if nextPage}
    <a
      href={nextPage.pathname}
      class="group pointer-events-auto absolute bottom-0 right-0 flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-stone-300 p-2 shadow-md"
      onpointerenter={() => (nextHovered = true)}
      onpointerleave={() => (nextHovered = false)}
    >
      <ArrowBigRight size={42} strokeWidth={3} absoluteStrokeWidth
      ></ArrowBigRight>
      {#if nextHovered}
        <p
          class="absolute -translate-y-16 text-nowrap rounded-md bg-stone-200 px-2 py-1 shadow-sm"
          transition:fly|global={{ y: 20, delay: 1 }}
        >
          {nextPage.label}
        </p>
      {/if}
    </a>
  {/if}
</nav>
