<script lang="ts">
  import '../app.css';
  import NavigationBar from '$lib/navigation/NavigationBar.svelte';
  import Header from '$lib/navigation/Header.svelte';
  import { onMount } from 'svelte';
  import Background from '$lib/design/Background.svelte';

  let display = false;
  onMount(() => {
    display = true;
  });
</script>

<div class="w-full h-full text-gray-900">
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
