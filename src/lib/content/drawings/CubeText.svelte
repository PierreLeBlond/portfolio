<script lang="ts">
  let width: number = $state(0);

  interface Props {
    index?: number;
    direction?: number;
    texts?: string[];
  }

  let { index = 0, direction = 0, texts = [] }: Props = $props();

  const slideIn = (_: HTMLElement) => ({
    duration: 500,
    css: (t: number, u: number) =>
      `transform: translateX(${
        u * (direction != 0 ? direction : -1) * width
      }px); opacity: ${t}`,
  });

  const slideOut = (_: HTMLElement) => ({
    duration: 500,
    css: (t: number, u: number) =>
      `transform: translateX(${
        u * (direction! - 0 ? -direction : 1) * width
      }px); opacity: ${t}`,
  });
</script>

<div
  bind:clientWidth={width}
  class="relative flex h-1/6 w-full items-center overflow-hidden pt-2"
>
  {#each texts as text, i}
    {#if i == index}
      <p
        class="absolute top-[40%] w-full text-center indent-2.5 text-xl"
        in:slideIn|global
        out:slideOut|global
      >
        {@html text}
      </p>
    {/if}
  {/each}
</div>
