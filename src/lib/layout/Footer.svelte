<script lang="ts">
  import SpriteSheetAnimator from "$lib/layout/reusable/SpriteSheetAnimator.svelte";
  import LoadingCue from "$lib/layout/loading/LoadingCue.svelte";
  import arrow from "$lib/icons/arrow.png";
  import { page } from "$app/stores";
  import { scale } from "svelte/transition";
  import { backIn, bounceOut } from "svelte/easing";
  import Dialog from "./Dialog.svelte";
  import { pointedPathname } from "$lib/stores/pathname";

  $: pathname = $page.url.pathname;
  $: pathnames = $page.data["pages"]
    .filter(({ isExternal }: { isExternal: boolean }) => !isExternal)
    .map(({ pathname }: { pathname: string }) => pathname);

  const getPageIndex = (pathname: string) => pathnames.indexOf(pathname);
  $: pageIndex = getPageIndex(pathname);

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  $: previousIndex = pageIndex > -1 ? mod(pageIndex - 1, pathnames.length) : -1;
  $: nextIndex = pageIndex > -1 ? mod(pageIndex + 1, pathnames.length) : -1;

  $: previousPathname = pathnames[previousIndex] ?? null;
  $: nextPathname = pathnames[nextIndex] ?? null;

  const pointPathname = (pathname: string | null) => {
    pointedPathname.set(pathname);
  };

  const unpointPathname = () => {
    pointedPathname.set(null);
  };

  let leftArrowWidth = 48;
  let leftArrowHeight = 48;

  let rightArrowWidth = 48;
  let rightArrowHeight = 48;
</script>

<div class="relative grid h-full w-full grid-cols-6 bg-black sm:grid-cols-12">
  <div
    class="order-1 col-span-1 col-start-1 flex items-center justify-start sm:col-start-4"
  >
    {#if previousPathname}
      <a
        bind:offsetWidth={leftArrowWidth}
        bind:offsetHeight={leftArrowHeight}
        class="h-12 w-12 hover:cursor-pointer"
        href={previousPathname}
        in:scale={{ easing: bounceOut, duration: 800 }}
        out:scale={{ easing: backIn }}
        on:mouseenter={() => pointPathname(previousPathname)}
        on:mouseleave={() => unpointPathname()}
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
  </div>
  <div class="order-2 col-span-4 col-start-2 flex items-center sm:col-start-5">
    <Dialog />
  </div>
  <div
    class="order-3 col-span-1 col-start-6 flex items-center justify-end sm:col-start-9"
  >
    {#if nextPathname}
      <a
        bind:offsetWidth={rightArrowWidth}
        bind:offsetHeight={rightArrowHeight}
        class="h-12 w-12 hover:cursor-pointer"
        href={nextPathname}
        in:scale={{ easing: bounceOut, duration: 800 }}
        out:scale={{ easing: backIn }}
        on:mouseenter={() => pointPathname(nextPathname)}
        on:mouseleave={() => unpointPathname()}
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
  </div>
  <div
    class="order-4 col-span-1 col-start-12 hidden items-center justify-end sm:flex"
  >
    <div class="relative mr-3 h-12 w-12">
      <LoadingCue />
    </div>
  </div>
</div>
