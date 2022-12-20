<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let width: number;

  export let index = 0;
  export let length = 0;

  $: items = Array(Number(length));

  const slide = (_: HTMLElement, { delay }: { delay: number }) => ({
    delay,
    duration: 500,
    css: (t: number, u: number) => `transform: translateX(${u * -width}px); opacity: ${t}`
  });

  const dispatch = createEventDispatcher();

  const handleClickEvent = (i: number) => {
    dispatch('choose', {
      index: i
    });
  };
</script>

<ul
  bind:clientWidth={width}
  class="w-full h-1/6 relative flex justify-center items-start"
>
  {#each items as _, i (i)}
    <li class="hover:cursor-pointer px-3">
      <div
        in:slide={{ delay: (items.length - i) * 50 }}
        out:slide={{ delay: i * 50 }}
        class:selected={i == index}
        class="group"
        on:click={() => handleClickEvent(i)}
        on:keydown={() => handleClickEvent(i)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="scale-90 group-[.selected]:scale-125 transition-transform duration-300 bi bi-circle-fill"
          viewBox="0 0 16 16"
        >
          <circle
            cx="8"
            cy="8"
            r="8"
          />
        </svg>
      </div>
    </li>
  {/each}
</ul>
