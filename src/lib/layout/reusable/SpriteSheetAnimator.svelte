<script lang="ts">
  import { tweened } from 'svelte/motion';

  export let url: string;
  export let columns: number;
  export let frames: number;

  export let mirrorY = false;

  export let width: number;
  export let height: number;

  export let activateOnHover = false;

  const frame = tweened(0, { duration: 1500 });

  $: backgroundWidth = width * columns;
  $: backgroundHeight = height * Math.ceil(frames / columns);
  $: backgroundX = -(Math.trunc($frame) % columns) * width;
  $: backgroundY = -Math.trunc(Math.trunc($frame) / columns) * height;

  let stop = true;
  const restartAnimation = () => {
    const isRunning = $frame > 0 && $frame < frames;
    if (isRunning) {
      return;
    }

    frame.set(0, { duration: 0 });

    if (stop) {
      return;
    }

    frame.set(frames).then(() => {
      restartAnimation();
    });
  };

  const startAnimation = () => {
    stop = false;
    restartAnimation();
  };

  const stopAnimation = () => {
    stop = true;
  };

  if (!activateOnHover) {
    startAnimation();
  }

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType != 'mouse') {
      return;
    }

    onHover();
  };

  const onHover = () => {
    if (!activateOnHover) {
      return;
    }

    startAnimation();
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType != 'mouse') {
      return;
    }

    onUnhover();
  };

  const onUnhover = () => {
    if (!activateOnHover) {
      return;
    }

    stopAnimation();
  };
</script>

<div
  class="h-full w-full"
  style:background-image={`url(${url})`}
  style:background-size={`${backgroundWidth}px ${backgroundHeight}px`}
  style:background-position={`left ${backgroundX}px top ${backgroundY}px`}
  style:transform={mirrorY ? 'scaleX(-1)' : ''}
  on:pointerenter={onPointerEnter}
  on:pointerleave={onPointerLeave}
  on:touchstart={onHover}
  on:touchend={onUnhover}
/>
