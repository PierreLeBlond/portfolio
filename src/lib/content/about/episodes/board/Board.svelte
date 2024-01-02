<script lang="ts">
  import RatioBox from "$lib/components/reusable/RatioBox.svelte";
  import boardPath from "./board.png";

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
    class="relative flex h-full w-full items-center justify-center bg-contain bg-center bg-no-repeat"
  >
    <p class="w-1/4 text-center text-4xl text-black">
      Being better at math made me take another path.
    </p>
  </div>
</RatioBox>
