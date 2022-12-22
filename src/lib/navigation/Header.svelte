<script lang="ts">
  import Block from '$lib/design/Block.svelte';
  import { fade, fly } from 'svelte/transition';
  import NavigationBar from './NavigationBar.svelte';

  let open = false;
  const toggleNavigation = () => {
    open = !open;
  };
</script>

{#if !open}
  <div
    class:open
    on:click={toggleNavigation}
    on:keypress={toggleNavigation}
    class="z-20 absolute w-22 bottom-0 left-0 pb-4 pl-16 flex flex-col justify-end md:hidden cursor-pointer -skew-y-12"
    in:fly={{ x: -512, delay: 200 }}
    out:fly={{ x: -512 }}
  >
    <Block
      label={'menu'}
      shadow={true}
    />
  </div>
{:else}
  <div
    class="z-20 absolute w-full h-full bg-gray-800 opacity-30"
    on:click={toggleNavigation}
    on:keypress={toggleNavigation}
    transition:fade
  />
  <div class="z-30 absolute w-64 h-full flex items-center pointer-events-none">
    <NavigationBar />
  </div>
{/if}
