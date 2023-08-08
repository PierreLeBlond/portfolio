<script lang="ts">
  import '../app.css';
  import Background from '$lib/layout/Background.svelte';
  import Header from '$lib/layout/Header.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import Viewer from '$lib/layout/Viewer/Viewer.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import InitialLoadingScreen from '$lib/layout/loading/InitialLoadingScreen.svelte';
  import AppStateMachine from '$lib/state/AppStateMachine.svelte';
  import { pointedPathname } from '$lib/stores/pathname';
  import { appEvent } from '$lib/state/appEvent';
  import { appState } from '$lib/state/appState';

  beforeNavigate(async (navigation) => {
    if (!navigation.to) {
      return;
    }

    pointedPathname.set(null);

    appEvent.set('navigate');
  });

  afterNavigate(() => {
    appEvent.set('navigated');
  });

  $: displayInitialLoadingScreen = $appState == 'mounting' || $appState == 'introducing';
</script>

<div class="relative flex h-screen w-screen flex-col overflow-hidden">
  {#if displayInitialLoadingScreen}
    <div class="absolute z-50 h-full w-full">
      <InitialLoadingScreen />
    </div>
  {/if}
  <header class="z-40 h-16 w-full">
    <Header />
  </header>
  <main class="relative grow text-gray-800">
    <Background />
    <div class="relative h-full w-full">
      <AppStateMachine />
      <Viewer>
        <slot />
      </Viewer>
    </div>
  </main>
  <footer class="z-40 h-16 w-full">
    <Footer />
  </footer>
</div>
