<script lang="ts">
  import { onMount } from "svelte";
  import { backIn, bounceOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";
  import { appEvent } from "$lib/state/appEvent";
  import { Cog } from "lucide-svelte";
  import { appState } from "$lib/state/appState";

  $: canOpen = $appState == "introducing";

  let offsetHeight: number;

  let displayText = true;
  const openInitialLoadingScreen = () => {
    if (!canOpen) {
      return;
    }
    appEvent.set("introduced");
    displayText = false;
  };

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

{#if displayText}
  <div
    bind:offsetHeight
    class="absolute flex h-full w-full flex-col pt-8 text-center text-xl text-stone-700 sm:pt-32 sm:text-2xl"
    role="button"
    tabindex="0"
    on:click={openInitialLoadingScreen}
    on:keydown={openInitialLoadingScreen}
  >
    {#if mounted}
      <p in:fade={{ duration: 1000 }} class="text-2xl">Pierre LESPINGAL</p>
      <p in:fade={{ duration: 1000, delay: 500 }}>3D & Web developer</p>

      <p in:fade={{ duration: 1000, delay: 1500 }} class="py-16 text-sm">
        presents
      </p>
      <p in:fade={{ duration: 1000, delay: 2500 }} class="pb-8">
        his portfolio
      </p>
      <p in:fade={{ duration: 1000, delay: 3000 }}>with chuncks of code</p>
      <p in:fade={{ duration: 1000, delay: 3000 }} class="pb-16">
        and bits of art
      </p>

      <div in:fade={{ duration: 1000, delay: 4000 }}>
        {#if canOpen}
          <p class="animate-pulse">Click to explore !</p>
        {:else}
          <div
            class="flex h-full w-full animate-spin items-center justify-center duration-1000"
            in:scale={{ easing: bounceOut, duration: 200 }}
            out:scale={{ easing: backIn, duration: 50 }}
          >
            <Cog size={32}></Cog>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}
