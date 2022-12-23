<script lang="ts">
  import '../app.css';
  import NavigationBar from '$lib/navigation/NavigationBar.svelte';
  import Header from '$lib/navigation/Header.svelte';
  import { onMount } from 'svelte';
  import Background from '$lib/design/Background.svelte';

  // Pattern to show transitions on first load
  let display = false;
  onMount(() => {
    display = true;
  });
</script>

<div class="relative w-screen h-screen overflow-hidden">
  <div class="contents text-gray-800">
    <Background />
    {#if display}
      <div class="z-10 w-full h-full flex flex-col">
        <div class="contents md:hidden">
          <Header />
        </div>
        <div class="flex grow">
          <div class="w-38 h-full hidden md:flex items-center justify-center">
            <NavigationBar />
          </div>
          <div class="relative flex mb-32 md:mb-0 grow justify-center items-center">
            <slot />
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
