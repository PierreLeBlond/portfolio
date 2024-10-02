<script lang="ts">
  import { page } from "$app/stores";
  import { descriptionOpenStatus } from "$lib/stores/descriptionOpenStatus";
  import { currentPage } from "$lib/stores/selectedPage";
  import { ArrowBigLeft, ArrowBigRight, Box, HelpCircle } from "lucide-svelte";

  $: pages = $page.data["pages"];

  $: pageIndex = $currentPage ? pages.indexOf($currentPage) : -1;

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  $: previousIndex = pageIndex > -1 ? mod(pageIndex - 1, pages.length) : -1;
  $: nextIndex = pageIndex > -1 ? mod(pageIndex + 1, pages.length) : -1;

  $: previousPage = pages[previousIndex] ?? null;
  $: nextPage = pages[nextIndex] ?? null;
</script>

<nav
  class="z-40 grid w-full grid-cols-4 items-center rounded-t-xl bg-stone-100 horizontal:grid-cols-3"
>
  {#if previousPage}
    <a
      href={previousPage.pathname}
      class="flex h-full w-full flex-col items-center justify-center p-2 hover:bg-stone-300 horizontal:w-24 horizontal:justify-self-start horizontal:rounded-xl xs:w-24 xs:rounded-tl-xl"
    >
      <ArrowBigLeft size={42} strokeWidth={3} absoluteStrokeWidth
      ></ArrowBigLeft>
      <p class="text-xs">
        {previousPage.label}
      </p>
    </a>
  {/if}
  <a
    href="/"
    class="flex h-full w-full flex-col items-center justify-center p-2 hover:bg-stone-300 horizontal:w-24 horizontal:justify-self-center horizontal:rounded-xl xs:w-24"
  >
    <Box class="rotate-180" size={42} strokeWidth={3} absoluteStrokeWidth></Box>
    <p class="text-xs">home</p>
  </a>
  <button
    type="button"
    class="flex h-full w-full flex-col items-center justify-center p-2 hover:bg-stone-300 horizontal:hidden xs:w-24"
    on:click={() => descriptionOpenStatus.set(!$descriptionOpenStatus)}
  >
    <HelpCircle
      size={42}
      strokeWidth={3}
      absoluteStrokeWidth
      class={`transition-transform ${$descriptionOpenStatus ? "rotate-180" : ""}`}
    ></HelpCircle>
    <p class="text-xs">info</p>
  </button>
  {#if nextPage}
    <a
      href={nextPage.pathname}
      class="flex h-full w-full flex-col items-center justify-center p-2 hover:bg-stone-300 horizontal:w-24 horizontal:justify-self-end horizontal:rounded-xl xs:w-24 xs:rounded-tr-xl"
    >
      <ArrowBigRight size={42} strokeWidth={3} absoluteStrokeWidth
      ></ArrowBigRight>
      <p class="text-nowrap text-xs">
        {nextPage.label}
      </p>
    </a>
  {/if}
</nav>
