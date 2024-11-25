<script lang="ts">
  import { page } from "$app/stores";
  import { globalState } from "$lib/state/globalState.svelte";
  import { ArrowBigLeft, ArrowBigRight, Box, HelpCircle } from "lucide-svelte";

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
    onclick={() => (open = !open)}
  >
    <HelpCircle
      size={42}
      strokeWidth={3}
      absoluteStrokeWidth
      class={`transition-transform ${open ? "rotate-180" : ""}`}
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
