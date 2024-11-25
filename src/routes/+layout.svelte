<script lang="ts">
  import "../app.css";
  import Background from "$lib/components/Background.svelte";
  import { page } from "$app/stores";
  import Viewer from "$lib/components/Viewer/Viewer.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import Loading from "$lib/components/project/Loading.svelte";
  import { onMount, setContext, type Snippet } from "svelte";
  import { useStateMachine } from "$lib/hooks/useStateMachine.svelte";
  import { configureViewer } from "$lib/components/Viewer/configureViewer";
  import { globalState, type Page } from "$lib/state/globalState.svelte";
  import { writable } from "svelte/store";
  import type { PublicViewer } from "@s0rt/3d-viewer";

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();

  page.subscribe((value) => {
    globalState.currentPage =
      value.data.pages.find(
        (pageData: Page) => pageData.pathname === value.url.pathname,
      ) || null;
  });

  const app = useStateMachine({
    get camera() {
      return $page.data.camera;
    },
    get controlMinDistance() {
      return $page.data.controlMinDistance;
    },
    get isHome() {
      return !!$page.data.isHome;
    },
  });

  setContext("app", app);

  beforeNavigate(async (navigation) => {
    if (!navigation.to) {
      return;
    }

    app.trigger("navigate");
  });

  afterNavigate(() => {
    app.trigger("navigated");
  });

  let displayInitialLoadingScreen = $derived(app.state == "mounting");

  const hidePageStates = [
    "mounting",
    "navigating",
    "navigatingWhileFlying",
    "flying",
  ];
  let showPage = $derived(!hidePageStates.includes(app.state));

  const publicViewerStore = writable<null | PublicViewer>(null);
  const getPublicViewer = async () =>
    new Promise<PublicViewer>((resolve) => {
      if (globalState.publicViewer) {
        resolve(globalState.publicViewer);
        return;
      }

      const unsubscribe = publicViewerStore.subscribe(
        (value: null | PublicViewer) => {
          if (!value) {
            return;
          }
          unsubscribe();
          resolve(value);
        },
      );
    });
  const getPublicViewerSync = () => {
    if (!globalState.publicViewer) {
      throw new Error("Viewer does not exists");
    }
    return globalState.publicViewer;
  };
  setContext("mainPublicViewerContext", {
    getPublicViewer,
    getPublicViewerSync,
  });

  let viewer: PublicViewer | null = $state(null);
  onMount(async () => {
    viewer = await configureViewer();
    await viewer.launch();
    globalState.publicViewer = viewer;

    publicViewerStore.set(viewer);

    viewer.pause();

    app.trigger("mounted");
  });
</script>

<div class="relative flex h-dvh w-screen flex-col overflow-hidden">
  <Background />

  <Loading></Loading>

  {#if displayInitialLoadingScreen}
    <div class="absolute z-40 h-full w-full">
      <Background></Background>
    </div>
  {/if}
  <main class="relative grow text-gray-800">
    <div id="container" class="relative h-full w-full">
      <div
        class="absolute top-0 h-full w-full {globalState.pointedPage
          ? 'cursor-pointer'
          : 'cursor-grab'}"
        id="viewer"
      ></div>
      {#if showPage}
        <div
          class="relative top-0 h-full w-full"
          class:pointer-events-none={$page.data.isHome}
        >
          {@render children()}
        </div>
      {/if}
      {#if viewer}
        <Viewer {viewer}></Viewer>
      {/if}
    </div>
  </main>
</div>
