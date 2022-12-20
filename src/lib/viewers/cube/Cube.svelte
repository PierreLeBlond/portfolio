<script lang="ts">
  import { spring, tweened } from 'svelte/motion';
  import { mod } from './util';
  import { onMount } from 'svelte';
  import { expoOut, sineIn, sineOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import Face from './Face.svelte';

  export let index = 0;
  export let direction = 0;
  export let yawOffset = 0;
  export let urls: string[] = [];
  export let pageIndex = 0;

  const land = (_: HTMLElement) => ({
    duration: 1000,
    easing: expoOut,
    css: (_: number, u: number) => `transform: translateY(-${u * 200}%);`
  });

  onMount(async () => {
    urlIndices[1] = mod(index + 1, urls.length);
    urlIndices[3] = mod(index - 1, urls.length);
  });

  // Cube sizing response to page size
  let width: number;
  let height: number;
  $: faceSize = Math.min(width, height) * 0.9;
  $: translation = faceSize / 2;

  let yawAnchor = 0;
  let yaw = spring(0, {
    stiffness: 0.02,
    damping: 0.2
  });
  let faceIndex = 0;
  const urlIndices = [0, 0, 0, 0, 0];
  $: console.log(urlIndices);
  const rotations = [0, 90, 180, -90];

  const rotateHorizontally = (newYawAnchor: number) => {
    yaw
      .update(() => newYawAnchor + yawOffset)
      .then(() => {
        // When rotation has finished, set correct previous face image, who could be different if we just jumped
        let previousFaceIndex = mod(faceIndex - direction, 4);
        urlIndices[previousFaceIndex] = mod(index - direction, urls.length);
      });
  };

  const changeIndex = (newIndex: number) => {
    // Set new face image before rotating
    faceIndex = mod(faceIndex + direction, 4);
    urlIndices[faceIndex] = newIndex;

    // Set new next face image before rotating, for we could see it during rotation animation
    let nextFaceIndex = mod(faceIndex + direction, 4);
    urlIndices[nextFaceIndex] = mod(newIndex + direction, urls.length);

    yawAnchor -= direction * 90;

    rotateHorizontally(yawAnchor);
  };

  // Rotate the cube when navigating
  $: changeIndex(index);

  const updateOffset = (newYawOffset: number) => {
    yaw.set(yawAnchor + newYawOffset);
  };
  $: updateOffset(yawOffset);

  let jump = tweened(0, {
    duration: 1000,
    easing: sineOut
  });

  let pitch = spring(0, {
    stiffness: 0.02,
    damping: 0.2
  });

  let oldUrls = urls.slice(0);
  let oldPageIndex = pageIndex;
  let topFaceUrl = '';
  let bottomFaceUrl = '';
  const changeUrls = (newUrls: string[]) => {
    if (newUrls.length == 0) {
      return;
    }

    if (oldUrls.length == 0) {
      return;
    }

    if (oldUrls.toString() == newUrls.toString()) {
      return;
    }

    const sign = Math.sign(oldPageIndex - pageIndex);

    // Set top face image before rotating up

    const oldUrl = oldUrls[index] ?? '';

    topFaceUrl = sign > 0 ? oldUrl : '';
    bottomFaceUrl = sign < 0 ? oldUrl : '';

    // Reset all rotation, making pitch rotation way easier
    pitch.set(sign * 90, { hard: true });
    yawAnchor = 0;
    yaw.set(0, { hard: true });

    jump.set(1).then(() => jump.set(0, { duration: 0 }));

    faceIndex = 0;
    urlIndices[faceIndex] = index;

    pitch.update(() => 0);
    oldUrls = newUrls.slice(0);
    oldPageIndex = pageIndex;
  };

  $: changeUrls(urls);
</script>

<div
  class="w-full h-3/4 relative flex justify-center items-center"
  style:transform-style="preserve-3d"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <div
    class="relative flex justify-center items-end"
    style="width:{faceSize}px; height:{faceSize}px;
    will-change: transform;
    transform-style: preserve-3d;
    transform: translateZ(-{translation}px) rotateY({$yaw}deg);"
  >
    <div
      class="w-full h-full"
      style="transform-style: preserve-3d;
      transform: translateY({-Math.sin($jump * Math.PI) * faceSize * 0.5}px) rotateX({$pitch}deg);"
      transition:land
    >
      {#each rotations as rotation, i}
        {@const urlIndice = urlIndices[i]}
        {@const url = urlIndice != undefined ? urls[urlIndice] ?? '' : ''}
        <Face
          {url}
          yaw={rotation}
          {translation}
          {faceSize}
        />
      {/each}
      <Face
        url={topFaceUrl}
        pitch={-90}
        {translation}
        {faceSize}
      />
      <Face
        url={bottomFaceUrl}
        pitch={90}
        {translation}
        {faceSize}
      />
    </div>

    <div
      class="absolute flex justify-center items-center"
      style="width: {faceSize}px; height: {faceSize}px; 
          transform-style: preserve-3d;
      transform: translateY({translation + faceSize / 30}px) rotateX(-90deg);
      opacity: {1.0 - Math.sin($jump * Math.PI)}"
      in:fade={{ duration: 1000, easing: sineIn }}
      out:fade={{ duration: 1000, easing: expoOut }}
    >
      <div
        class="w-1/3 h-1/3 flex justify-center items-center bg-black"
        style="transform-style: preserve-3d; transform-origin: 50% 50% -200px; box-shadow: 0px 0px {faceSize /
          4}px {faceSize / 3}px black;"
      />
    </div>
  </div>
</div>
