<script lang="ts">
  import '../app.css';
  import Background from '$lib/layout/Background.svelte';
  import Header from '$lib/layout/Header.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Viewer from '$lib/layout/Viewer/Viewer.svelte';
  import { pointedPathname, selectedPathname } from '$lib/stores/pathname';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import InitialLoadingScreen from '$lib/layout/loading/InitialLoadingScreen.svelte';
  import { globalState } from '$lib/stores/globalState';
  import { viewerState } from '$lib/stores/viewerState';

  beforeNavigate(async (navigation) => {
    if (!navigation.to) {
      return;
    }

    const { pathname } = navigation.to.url;
    selectedPathname.set(pathname);

    pointedPathname.set(null);

    globalState.set('navigating');
  });

  afterNavigate(() => {
    globalState.set('ready');
  });

  let displayInitialLoadingScreen = true;
  const finishInitialLoading = () => {
    displayInitialLoadingScreen = false;
    globalState.set('introducing');
  };
</script>

<div class="relative flex h-screen w-screen flex-col overflow-hidden">
  {#if displayInitialLoadingScreen}
    <div class="absolute z-50 h-full w-full">
      <InitialLoadingScreen
        canOpen={$viewerState == 'mounted'}
        on:open={finishInitialLoading}
      />
    </div>
  {/if}
  <header class="z-40 h-16 w-full">
    <Header />
  </header>
  <main class="relative grow text-gray-800">
    <Background />
    <div class="relative h-full w-full">
      <Viewer>
        <slot />
      </Viewer>
    </div>
  </main>
  <footer class="z-40 h-16 w-full">
    <Footer />
  </footer>
</div>
