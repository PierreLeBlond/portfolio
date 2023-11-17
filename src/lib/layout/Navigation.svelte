<script lang="ts">
  import SpriteSheetAnimator from "$lib/layout/reusable/SpriteSheetAnimator.svelte";
  import LoadingCue from "$lib/layout/loading/LoadingCue.svelte";
  import arrow from "$lib/icons/arrow.png";
  import { page } from "$app/stores";
  import { scale } from "svelte/transition";
  import { backIn, bounceOut } from "svelte/easing";
  import Dialog from "./hud/Dialog.svelte";
  import { currentPage, touchedPage } from "$lib/stores/selectedPage";

  $: pages = $page.data["pages"].filter(
    ({ isExternal }: { isExternal: boolean }) => !isExternal,
  );

  $: pageIndex = $currentPage ? pages.indexOf($currentPage) : -1;

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  $: previousIndex = pageIndex > -1 ? mod(pageIndex - 1, pages.length) : -1;
  $: nextIndex = pageIndex > -1 ? mod(pageIndex + 1, pages.length) : -1;

  $: previousPage = pages[previousIndex] ?? null;
  $: nextPage = pages[nextIndex] ?? null;

  let leftArrowWidth = 48;
  let leftArrowHeight = 48;

  let rightArrowWidth = 48;
  let rightArrowHeight = 48;
</script>

<nav
  class="absolute bottom-0 flex h-32 w-full items-center justify-center large:h-48"
>
  {#if previousPage}
    <a
      bind:offsetWidth={leftArrowWidth}
      bind:offsetHeight={leftArrowHeight}
      class="pointer-events-auto h-12 w-12 hover:cursor-pointer"
      href={previousPage.pathname}
      in:scale={{ easing: bounceOut, duration: 800 }}
      out:scale={{ easing: backIn, duration: 150 }}
    >
      <SpriteSheetAnimator
        url={arrow}
        columns={8}
        frames={50}
        width={leftArrowWidth}
        height={leftArrowHeight}
        mirrorY={true}
        activateOnHover={true}
      />
    </a>
  {/if}
  <div class="pointer-events-auto relative">
    <div class="h-16 w-48 sm:w-64">
      <Dialog />
    </div>
    <div class="absolute left-20 -translate-y-20 sm:left-32 sm:-translate-x-4">
      <LoadingCue />
    </div>
    {#if $touchedPage}
      <a
        in:scale={{ easing: bounceOut, duration: 800 }}
        out:scale={{ easing: backIn, duration: 150 }}
        href={$touchedPage.pathname}
        class="absolute left-20 flex h-8 w-32 -translate-x-12 -translate-y-4 items-center justify-center rounded bg-white text-center shadow-md sm:left-32 sm:-translate-x-16"
        ><p class="text-xs font-bold">EXPLORE</p>
      </a>
    {/if}
    {#if $currentPage}
      <a
        in:scale={{ easing: bounceOut, duration: 800 }}
        out:scale={{ easing: backIn }}
        href="/"
        class="absolute left-20 flex h-8 w-32 -translate-x-12 -translate-y-4 items-center justify-center rounded bg-white text-center shadow-md sm:left-32 sm:-translate-x-16"
        ><p class="text-xs font-bold">BACK TO HOME</p>
      </a>
    {/if}
  </div>
  {#if nextPage}
    <a
      bind:offsetWidth={rightArrowWidth}
      bind:offsetHeight={rightArrowHeight}
      class="pointer-events-auto h-12 w-12 hover:cursor-pointer"
      href={nextPage.pathname}
      in:scale={{ easing: bounceOut, duration: 800 }}
      out:scale={{ easing: backIn, duration: 150 }}
    >
      <SpriteSheetAnimator
        url={arrow}
        columns={8}
        frames={50}
        width={rightArrowWidth}
        height={rightArrowHeight}
        activateOnHover={true}
      />
    </a>
  {/if}
</nav>
