<script lang="ts">
  import RatioBox from '$lib/layout/reusable/RatioBox.svelte';
  import boardPath from './board.png';

  export let time: number;
  export let speed: number;

  const duration = 2.0;

  const computeTop = (time: number, speed: number, duration: number) => {
    if (time < 0.0) {
      return speed;
    }

    const inTime = time - duration / 2.0;
    if (inTime < 0.0) {
      return -inTime * speed;
    }

    const outTime = time - duration;
    if (outTime < 0.0) {
      return -(speed + outTime * speed);
    }

    return -speed;
  };

  $: top = computeTop(time, speed, duration);
</script>

<RatioBox ratio={16 / 9}>
  <div
    style:background-image={`url(${boardPath})`}
    style:top={`${top}px`}
    class="relative w-full h-full flex items-center justify-center bg-no-repeat bg-contain bg-center"
  >
    <p class="w-1/4 text-4xl text-black text-center">Being better at math made me take another path.</p>
  </div>
</RatioBox>
