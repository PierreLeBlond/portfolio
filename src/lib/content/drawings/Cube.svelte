<script lang="ts">
  import { spring, tweened } from "svelte/motion";
  import { mod } from "./util";
  import { onMount } from "svelte";
  import { expoOut, sineIn, sineOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import Face from "./Face.svelte";

  interface Props {
    index: number;
    direction: number;
    yawOffset: number;
    urls: string[];
    faceSize: number;
  }

  let {
    index,
    direction,
    yawOffset,
    urls,
    faceSize = $bindable(),
  }: Props = $props();

  const land = (_: HTMLElement) => ({
    delay: 1,
    duration: 1000,
    easing: expoOut,
    css: (_: number, u: number) => `transform: translateY(-${u * 200}%);`,
  });

  onMount(async () => {
    urlIndices[1] = mod(index + 1, urls.length);
    urlIndices[3] = mod(index - 1, urls.length);
  });

  // Cube sizing response to page size
  let width: number = $state(0);
  let height: number = $state(0);

  $effect(() => {
    faceSize = Math.min(width, height) * 0.9;
  });
  let translation = $derived(faceSize / 2);

  let yawAnchor = 0;
  let yaw = spring(0, {
    stiffness: 0.02,
    damping: 0.2,
  });
  let faceIndex = 0;
  const urlIndices = $state([0, 0, 0, 0, 0]);
  const rotations = [0, 90, 180, -90];

  const changeIndex = (newIndex: number) => {
    // Set new face image before rotating
    faceIndex = mod(faceIndex + direction, 4);
    urlIndices[faceIndex] = newIndex;

    // Set new next face image before rotating, for we could see it during rotation animation
    let nextFaceIndex = mod(faceIndex + direction, 4);
    urlIndices[nextFaceIndex] = mod(newIndex + direction, urls.length);

    yawAnchor -= direction * 90;

    yaw
      .update(() => yawAnchor)
      .then(() => {
        // When rotation has finished, set correct previous face image, who could be different if we just jumped
        let previousFaceIndex = mod(faceIndex - direction, 4);
        urlIndices[previousFaceIndex] = mod(index - direction, urls.length);
      });
  };

  $effect(() => {
    changeIndex(index);
  });

  $effect(() => {
    // Sync spring store
    yaw.set(yawAnchor + yawOffset);
  });
</script>

<div
  class="relative flex h-3/4 w-full items-center justify-center"
  style:transform-style="preserve-3d"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <div
    class="relative flex items-end justify-center hover:cursor-grab"
    style="width:{faceSize}px; height:{faceSize}px;
    will-change: transform;
    transform-style: preserve-3d;
    transform: translateZ(-{translation}px) rotateY({$yaw}deg);"
  >
    <div
      class="h-full w-full"
      style="transform-style: preserve-3d;"
      transition:land|global
    >
      {#each rotations as rotation, i}
        {@const urlIndice = urlIndices[i]}
        {@const url = urlIndice != undefined ? (urls[urlIndice] ?? "") : ""}
        <Face {url} yaw={rotation} {translation} {faceSize} />
      {/each}
      <Face url={null} pitch={-90} {translation} {faceSize} />
      <Face url={null} pitch={90} {translation} {faceSize} />
    </div>

    <div
      class="absolute flex items-center justify-center"
      style="width: {faceSize}px; height: {faceSize}px; 
          transform-style: preserve-3d;
      transform: translateY({translation + faceSize / 30}px) rotateX(-90deg);"
      in:fade|global={{ duration: 1000, easing: sineIn, delay: 1 }}
      out:fade|global={{ duration: 1000, easing: expoOut, delay: 1 }}
    >
      <div
        class="h-full w-full bg-gray-800"
        style="transform-style: preserve-3d; transform-origin: 50% 50% -200px;"
        style:filter={"blur(2em)"}
      ></div>
    </div>
  </div>
</div>
