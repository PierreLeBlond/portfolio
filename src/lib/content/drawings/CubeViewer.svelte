<script lang="ts">
  import Cube from "./Cube.svelte";
  import CubeNavigation from "./CubeNavigation.svelte";
  import { onDestroy, onMount } from "svelte";

  let index = $state(0);
  let direction = $state(0);
  let yawOffset = $state(0);

  let isLocked = false;

  const mod = (n: number, m: number) => ((n % m) + m) % m;

  interface Props {
    urls: string[];
    texts: string[];
    text: string | null;
  }

  let { urls, texts, text = $bindable() }: Props = $props();

  let length = $derived(urls.length);

  $effect(() => {
    text = texts[index] ?? null;
  });

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

    if (event.code == "KeyH" || event.code == "ArrowLeft") {
      index = mod(index - 1, urls.length);
      direction = -1;
    } else if (event.code == "KeyL" || event.code == "ArrowRight") {
      index = mod(index + 1, urls.length);
      direction = 1;
    }
  };

  let faceSize: number = $state(0);
  let lastX = 0;
  const move = (clientX: number) => {
    if (isLocked) {
      yawOffset = ((clientX - lastX) / faceSize) * 90.0;
    }
  };
  const handlePointerMove = (event: PointerEvent) => {
    event.preventDefault();
    move(event.clientX);
  };
  const lock = (clientX: number) => {
    isLocked = true;
    lastX = clientX;
  };
  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault();
    lock(event.clientX);
  };
  const release = (event: PointerEvent) => {
    event.preventDefault();
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
    mounted = true;
  });

  onDestroy(() => {
    if (!mounted) {
      return;
    }
    document.onkeydown = null;
  });
</script>

<div
  class="flex h-full w-full touch-none select-none flex-col flex-nowrap items-center justify-center"
  style:perspective="100vh"
  style:perspective-origin="50% 50%"
  role="presentation"
  onpointermove={handlePointerMove}
  onpointerdown={handlePointerDown}
  onpointerup={release}
  onpointerleave={release}
>
  <Cube {urls} {index} {direction} {yawOffset} bind:faceSize />
  <CubeNavigation {length} {index} on:choose={handleChooseEvent} />
</div>
