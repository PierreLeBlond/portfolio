<script lang="ts">
  let width: number;

  export let index = 0;
  export let direction = 0;
  export let texts: string[] = [];

  const slideIn = (_: HTMLElement) => ({
    duration: 500,
    css: (t: number, u: number) =>
      `transform: translateX(${u * (direction != 0 ? direction : -1) * width}px); opacity: ${t}`
  });

  const slideOut = (_: HTMLElement) => ({
    duration: 500,
    css: (t: number, u: number) =>
      `transform: translateX(${u * (direction! - 0 ? -direction : 1) * width}px); opacity: ${t}`
  });
</script>

<div
  bind:clientWidth={width}
  class="w-full h-1/6 relative flex items-center pt-2 overflow-hidden"
>
  {#each texts as text, i}
    {#if i == index}
      <p
        class="absolute w-full top-[40%] indent-2.5 text-center"
        in:slideIn
        out:slideOut
      >
        {@html text}
      </p>
    {/if}
  {/each}
</div>
