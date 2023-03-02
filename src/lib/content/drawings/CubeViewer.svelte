<script lang="ts">
  import Cube from './Cube.svelte';
  import CubeNavigation from './CubeNavigation.svelte';
  import { unifyTouchEvent } from './util';
  import { onDestroy, onMount } from 'svelte';

  let index = 0;
  let direction = 0;
  let yawOffset = 0;

  let isLocked = false;

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  export let urls: string[] = [];
  export let texts: string[] = [];
  export let pageIndex: number;
  export let text: string | null;

  $: length = urls.length;

  $: text = texts[index] ?? null;

  const handleChooseEvent = (event: { detail: { index: number } }) => {
    if (event.detail.index == index) {
      return;
    }

    direction = Math.sign(event.detail.index - index);
    index = event.detail.index;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isLocked) {
      return;
    }

    if (event.code == 'KeyH' || event.code == 'ArrowLeft') {
      index = mod(index - 1, urls.length);
      direction = -1;
    } else if (event.code == 'KeyL' || event.code == 'ArrowRight') {
      index = mod(index + 1, urls.length);
      direction = 1;
    }
  };

  let faceSize: number;
  let lastX = 0;
  const move = (clientX: number) => {
    if (isLocked) {
      yawOffset = ((clientX - lastX) / faceSize) * 90.0;
    }
  };
  const handleMouseMove = (event: TouchEvent | Touch) => move(unifyTouchEvent(event));
  const lock = (clientX: number) => {
    isLocked = true;
    lastX = clientX;
  };
  const handleMouseDown = (event: TouchEvent | Touch) => lock(unifyTouchEvent(event));
  const release = () => {
    if (Math.abs(yawOffset) > 45) {
      direction = -Math.sign(yawOffset);
      index = mod(index + direction, urls.length);
    }
    yawOffset = 0;
    isLocked = false;
  };

  let mounted = false;
  onMount(() => {
    document.onkeydown = handleKeyDown;
    document.ontouchmove = handleMouseMove;
    document.ontouchstart = handleMouseDown;
    document.ontouchend = release;
    mounted = true;
  });

  onDestroy(() => {
    if (!mounted) {
      return;
    }
    document.onkeydown = null;
    document.ontouchmove = null;
    document.ontouchstart = null;
    document.ontouchend = null;
  });
</script>

<div
  class="flex h-full w-full flex-col flex-nowrap items-center justify-center overflow-x-visible pt-2.5"
  style:perspective="100vh"
  style:perspective-origin="50% 50%"
  on:mousemove|preventDefault={handleMouseMove}
  on:mousedown|preventDefault={handleMouseDown}
  on:mouseup|preventDefault={release}
  on:mouseleave|preventDefault={release}
>
  <Cube
    {urls}
    {index}
    {pageIndex}
    {direction}
    {yawOffset}
    bind:faceSize
  />

  <!--CubeText
    {texts}
    {index}
    {direction}
  /-->

  <CubeNavigation
    {length}
    {index}
    on:choose={handleChooseEvent}
  />
</div>
