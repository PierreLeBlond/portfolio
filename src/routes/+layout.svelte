<script lang="ts">
  import "../app.css";
  import Background from "$lib/layout/Background.svelte";
  import { page } from "$app/stores";
  import Viewer from "$lib/layout/Viewer/Viewer.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import InitialLoadingScreen from "$lib/layout/loading/InitialLoadingScreen.svelte";
  import AppStateMachine from "$lib/state/AppStateMachine.svelte";
  import { pointedPathname } from "$lib/stores/pathname";
  import { appEvent } from "$lib/state/appEvent";
  import { appState } from "$lib/state/appState";
  import Hud from "$lib/layout/Hud.svelte";

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
</script>

<div class="relative flex h-screen w-screen flex-col overflow-hidden">
  <Background />
  {#if displayInitialLoadingScreen}
    <div class="absolute z-50 h-full w-full">
      <Background></Background>
      <InitialLoadingScreen />
    </div>
  {:else}
    <Hud></Hud>
  {/if}
  <main class="relative grow text-gray-800">
    <div id="container" class="relative h-full w-full">
      <AppStateMachine />

      <Viewer>
        <!-- pages are within viewer component for some of them need viewer context -->
        {#if !$page.data["isHome"] && ($appState == "idle" || $appState == "loading")}
          <div class="relative z-10 h-full w-full">
            <slot />
          </div>
        {/if}
      </Viewer>
    </div>
  </main>
</div>
