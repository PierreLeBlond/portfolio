<script lang="ts">
  import { fly } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';

  const transitionIn = {
    duration: 500,
    x: -512,
    opacity: 1,
    ease: expoOut
  };

  const transitionOut = {
    duration: 200,
    x: -512,
    opacity: 1
  };

  const routes = [
    {
      name: 'drawings',
      endpoints: [
        {
          name: 'ink',
          offset: 6
        },
        {
          name: 'logo',
          offset: 18
        }
      ]
    },
    {
      name: 'experiments',
      endpoints: [
        {
          name: 'wave',
          offset: 2
        }
      ]
    },
    {
      name: 'renderings',
      endpoints: [
        {
          name: 'chess',
          offset: 28
        },
        {
          name: 'earth',
          offset: 12
        }
      ]
    }
  ];
</script>

<ul>
  <li class="flex mt-3">
    <a
      class="z-10"
      href="/"
    >
      <div
        class="inline-block box-content w-full mt-1 pr-2 bg-gray-200 rounded-r border-y border-r border-gray-800 hover:bg-orange-600 hover:text-gray-200 transition-colors shadow-solid text-end text-lg md:text-xl"
        style:padding-left="14px"
        in:fly={{ ...transitionIn }}
        out:fly={{ ...transitionOut }}
      >
        home
      </div>
    </a>
  </li>

  {#each routes as route, routeIndex}
    <li class="mt-3">
      <ul class="flex flex-col">
        {#each route.endpoints as endpoint, endpointIndex}
          <a
            class="z-10"
            href="/{route.name}/{endpoint.name}"
          >
            <li
              class="inline-block box-content w-full mt-1 pr-2 bg-gray-200 rounded-r border-y border-r border-gray-800 hover:bg-orange-600 hover:text-gray-200 transition-colors shadow-solid text-end text-lg md:text-xl"
              style:padding-left="{endpoint.offset}px"
              in:fly={{ ...transitionIn, delay: routeIndex * 200 + endpointIndex * 50 }}
              out:fly={{ ...transitionOut, delay: routeIndex * 50 + endpointIndex * 20 }}
            >
              {endpoint.name}
            </li>
          </a>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
