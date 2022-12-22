<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { expoIn, expoOut } from 'svelte/easing';
  import Block from '$lib/design/Block.svelte';

  let clientHeight;

  const transitionIn = {
    duration: 500,
    opacity: 1,
    ease: expoIn
  };

  const transitionOut = {
    duration: 200,
    opacity: 1,
    ease: expoIn
  };

  const routes = [
    {
      name: 'home',
      path: ''
    },
    {
      name: 'ink',
      path: 'drawings/ink'
    },
    {
      name: 'logo',
      path: 'drawings/logo'
    },
    {
      name: 'wave',
      path: 'experiments/wave'
    },
    {
      name: 'chess',
      path: 'renderings/chess'
    },
    {
      name: 'earth',
      path: 'renderings/earth'
    }
  ];
</script>

<ul
  bind:clientHeight
  class="relative w-22 h-full flex flex-col justify-end pb-4 pl-16 -skew-y-12"
>
  {#each routes as route, routeIndex}
    <li
      style:z-index={routes.length - routeIndex}
      style:margin-bottom={routeIndex == 0 ? '1em' : '0em'}
      class="relative w-full transition-transform hover:-translate-x-4"
      in:fly={{ ...transitionIn, y: -1024, delay: (routes.length - routeIndex) * 50 }}
      out:fly={{ ...transitionOut, y: -clientHeight, delay: routeIndex * 50 }}
    >
      <a
        href="/{route.path}"
        class="pointer-events-auto"
      >
        <Block label={route.name} />
      </a>
    </li>
  {/each}
  <li
    class="w-full h-8 origin-bottom -translate-y-4 left-0 skew-x-[45deg] bg-gray-800"
    style:filter={'blur(0.6em)'}
    in:fade={{ duration: 200, delay: 300, easing: expoIn }}
    out:fade={{ duration: 1000, easing: expoOut }}
  />
</ul>
