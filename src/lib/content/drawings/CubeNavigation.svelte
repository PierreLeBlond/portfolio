<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let width: number;

  export let index = 0;
  export let length = 0;

  $: items = Array(Number(length));

  const slide = (_: HTMLElement, { delay }: { delay: number }) => ({
    delay,
    duration: 500,
    css: (t: number, u: number) =>
      `transform: translateX(${u * -width}px); opacity: ${t}`,
  });

  const dispatch = createEventDispatcher();

  const handleClickEvent = (i: number) => {
    dispatch("choose", {
      index: i,
    });
  };
</script>

<ul
  bind:clientWidth={width}
  class="relative flex h-1/6 w-full items-center justify-center pt-2"
>
  {#each items as _, i (i)}
    <li class="px-3">
      <div
        in:slide|global={{ delay: (items.length - i) * 50 }}
        out:slide|global={{ delay: i * 50 }}
        class:selected={i == index}
        class="group hover:cursor-pointer"
        role="button"
        tabindex={i}
        on:click={() => handleClickEvent(i)}
        on:keydown={() => handleClickEvent(i)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-circle-fill scale-90 transition-transform duration-300 group-[.selected]:scale-125"
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="8" r="8" />
        </svg>
      </div>
    </li>
  {/each}
</ul>
