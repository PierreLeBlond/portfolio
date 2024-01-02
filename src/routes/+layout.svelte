<script lang="ts">
  import "../app.css";
  import Background from "$lib/components/Background.svelte";
  import { page } from "$app/stores";
  import Viewer from "$lib/components/Viewer/Viewer.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import InitialLoadingScreen from "$lib/components/LoadingScreen.svelte";
  import AppStateMachine from "$lib/state/AppStateMachine.svelte";
  import { pointedPathname } from "$lib/stores/pathname";
  import { appEvent } from "$lib/state/appEvent";
  import { appState } from "$lib/state/appState";
  import Home from "$lib/components/hud/Home.svelte";
  import Navigation from "$lib/components/hud/Navigation.svelte";
  import Explore from "$lib/components/hud/Explore.svelte";
  import Loading from "$lib/components/hud/Loading.svelte";

  beforeNavigate(async (navigation) => {
    if (!navigation.to) {
      return;
    }

    pointedPathname.set(null);

    appEvent.set("navigate");
  });

  afterNavigate(() => {
    appEvent.set("navigated");
  });

  $: displayInitialLoadingScreen =
    $appState == "mounting" || $appState == "introducing";

  $: isHome = $page.data["isHome"];
</script>

<div class="relative flex h-screen w-screen flex-col overflow-hidden">
  <Background />

  {#if !isHome}
    <Home></Home>
  {/if}

  {#if !isHome}
    <Navigation></Navigation>
  {/if}

  <Explore></Explore>

  <Loading></Loading>

  {#if displayInitialLoadingScreen}
    <div class="absolute z-50 h-full w-full">
      <Background></Background>
      <InitialLoadingScreen />
    </div>
  {/if}
  <main class="relative grow text-gray-800">
    <div id="container" class="relative h-full w-full">
      <AppStateMachine />

      <Viewer>
        <!-- pages are within viewer component for some of them need viewer context -->
        {#if $appState === "idle" || $appState === "loading"}
          <div
            class="relative top-0 h-full w-full"
            class:pointer-events-none={isHome}
          >
            <slot />
          </div>
        {/if}
      </Viewer>
    </div>
  </main>
</div>
