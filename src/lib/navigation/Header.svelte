<script lang="ts">
  import { expoOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import NavigationBar from './NavigationBar.svelte';
  import { page } from '$app/stores';

  let open = false;
  const toggleNavigation = () => {
    open = !open;
  };

  $: title = $page.data['title'];
</script>

<div class="w-full h-16 z-10 text-base md:text-xl">
  <div
    style:box-shadow={'0px 2px rgba(0, 0, 0, 0.2)'}
    class="h-16 flex items-center p-4 bg-gray-200 border-b border-gray-800 "
    transition:fly={{ easing: expoOut, y: -64, duration: 500, opacity: 1 }}
  >
    <div
      class:open
      on:click={toggleNavigation}
      on:keypress={toggleNavigation}
      class="absolute flex pr-4 items-center md:hidden cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-map"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
        />
      </svg>
    </div>
    <div class="w-full md:w-full pl-0 md:pl-32 relative flex justify-center items-center">
      {#key title}
        <h1
          out:fade={{ duration: 200 }}
          in:fade={{ delay: 200 }}
          class="absolute"
        >
          {title || 'Pierre Lespingal'}
        </h1>
      {/key}
    </div>
  </div>
</div>
{#if open}
  <div
    class="absolute w-full h-full bg-gray-800 opacity-30 z-10"
    on:click={toggleNavigation}
    on:keypress={toggleNavigation}
    transition:fade
  />
  <div class="absolute w-32 mt-16 z-10">
    <NavigationBar />
  </div>
{/if}
