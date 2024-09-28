<script lang="ts">
  import { onMount } from "svelte";
  import { setContext } from "svelte";
  import { configureViewer } from "./configureViewer";
  import type { PublicViewer } from "@s0rt/3d-viewer";
  import Objects from "./Objects/Objects.svelte";
  import { publicViewer } from "$lib/stores/publicViewer";
  import { appEvent } from "$lib/state/appEvent";
  import { appState } from "$lib/state/appState";
  import { pointedPage } from "$lib/stores/selectedPage";

  const getPublicViewer = async () =>
    new Promise<PublicViewer>((resolve) => {
      if ($publicViewer) {
        resolve($publicViewer);
        return;
      }

      const unsubscribe = publicViewer.subscribe(
        (publicViewer: null | PublicViewer) => {
          if (!publicViewer) {
            return;
          }
          unsubscribe();
          resolve(publicViewer);
        },
      );
    });
  const getPublicViewerSync = () => {
    if (!$publicViewer) {
      throw new Error("Viewer does not exists");
    }
    return $publicViewer;
  };
  setContext("mainPublicViewerContext", {
    getPublicViewer,
    getPublicViewerSync,
  });

  onMount(async () => {
    const viewer = await configureViewer();
    await viewer.launch();
    publicViewer.set(viewer);

    viewer.pause();

    appEvent.set("mounted");
  });
</script>

<div
  class="absolute top-0 h-full w-full"
  class:cursor-pointer={$pointedPage}
  id="viewer"
/>

<slot />

{#if $appState != "mounting" && $appState != "introducing"}
  <Objects />
{/if}
