<script lang="ts">
  import { onMount } from 'svelte';
  import { bounceOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import { typewritter } from '../reusable/typewritter';
  import { appState } from '$lib/state/appState';
  import { appEvent } from '$lib/state/appEvent';

  $: canOpen = $appState == 'introducing';

  let offsetHeight: number;

  let displayText = true;
  const openInitialLoadingScreen = () => {
    if (!canOpen) {
      return;
    }
    appEvent.set('introduced');
    displayText = false;
  };

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

<div
  class="absolute top-0 h-1/2 w-full bg-black"
  out:fly={{ y: -offsetHeight, duration: 1000, opacity: 1, easing: bounceOut }}
/>
<div
  class="absolute bottom-0 h-1/2 w-full bg-black"
  out:fly={{ y: offsetHeight, duration: 1000, opacity: 1, easing: bounceOut }}
/>

{#if displayText}
  <div
    bind:offsetHeight
    class="absolute flex h-full w-full flex-col pt-8 pl-8 text-xl text-white sm:pt-32 sm:pl-32 sm:text-2xl"
    role="button"
    tabindex="0"
    on:click={openInitialLoadingScreen}
    on:keydown={openInitialLoadingScreen}
  >
    {#if mounted}
      <p in:typewritter={{ maxDuration: 1000 }}>So, I'm building a portfolio,</p>
      <p>
        <span in:typewritter={{ delay: 1000, maxDuration: 500 }}>With code & </span>
        <span
          class="text-orange-400"
          in:typewritter={{ delay: 1500, maxDuration: 200 }}>art</span
        ><span in:typewritter={{ delay: 1700, maxDuration: 50 }}>,</span>
      </p>
      <p>
        <span in:typewritter={{ delay: 2000, maxDuration: 1000 }}>Though I'm not an artist, but a</span>
        <span
          class="text-orange-400"
          in:typewritter={{ delay: 3000, maxDuration: 200 }}>developer</span
        ><span in:typewritter={{ delay: 3200, maxDuration: 50 }}>.</span>
      </p>
      <p
        in:fade={{ delay: 3500, duration: 1000 }}
        class="animate-pulse"
      >
        <br />
        <span class="animate-pulse">
          {#if canOpen}
            Click if you want to explore !
          {:else}
            Wait a moment before exploring...
          {/if}
        </span>
      </p>
    {/if}
  </div>
{/if}
