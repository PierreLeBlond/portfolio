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

<div class="w-screen h-screen flex text-gray-900 overflow-hidden">
  <Background />
  {#if display}
    <div class="flex flex-col grow">
      <Header />
      <div class="flex grow">
        <div class="w-32 h-full hidden md:block">
          <NavigationBar />
        </div>
        <div class="relative flex grow justify-center items-center">
          <slot />
        </div>
      </div>
    </div>
  {/if}
</div>
