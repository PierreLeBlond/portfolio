<script lang="ts">
  import { page } from "$app/stores";
  import { currentPage } from "$lib/stores/selectedPage";
  import { ArrowBigLeft, ArrowBigRight } from "lucide-svelte";
  import Button from "$lib/components/reusable/Button.svelte";

  $: pages = $page.data["pages"].filter(
    ({ isExternal }: { isExternal: boolean }) => !isExternal,
  );

  $: pageIndex = $currentPage ? pages.indexOf($currentPage) : -1;

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  $: previousIndex = pageIndex > -1 ? mod(pageIndex - 1, pages.length) : -1;
  $: nextIndex = pageIndex > -1 ? mod(pageIndex + 1, pages.length) : -1;

  $: previousPage = pages[previousIndex] ?? null;
  $: nextPage = pages[nextIndex] ?? null;
</script>

<nav
  class="absolute bottom-16 left-8 z-40 flex flex-col items-center gap-y-4 large:left-16 large:gap-y-6"
>
  {#if previousPage}
    <Button href={previousPage.pathname}>
      <ArrowBigLeft class="large:h-8 large:w-8"></ArrowBigLeft>
    </Button>
  {/if}
  {#if nextPage}
    <Button href={nextPage.pathname}>
      <ArrowBigRight class="large:h-8 large:w-8"></ArrowBigRight>
    </Button>
  {/if}
</nav>
