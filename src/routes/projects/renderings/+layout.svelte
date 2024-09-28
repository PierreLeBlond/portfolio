<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { setContext } from "svelte";
  import type { LayoutData } from "./$types";
  import { get, writable, type Writable } from "svelte/store";
  import { IblSpace, PublicViewer } from "@s0rt/3d-viewer";
  import { fade } from "svelte/transition";
  import { VERTICAL_RATIO_LIMIT } from "../../../constants";
  import { cameraTarget } from "$lib/stores/cameraTarget";
  import { configureViewOffset } from "$lib/components/Viewer/configureScreenOffset";

  export let data: LayoutData;

  let publicViewerWritable: Writable<null | PublicViewer> = writable(null);
  const getPublicViewer = async () =>
    new Promise<PublicViewer>((resolve) => {
      if ($publicViewerWritable) {
        resolve($publicViewerWritable);
        return;
      }

      const unsubscribe = publicViewerWritable.subscribe(
        (publicViewer: null | PublicViewer) => {
          if (!publicViewer) {
            return;
          }
          unsubscribe();
          resolve(publicViewer);
        },
      );
    });
  setContext("renderingsPublicViewerContext", { getPublicViewer });

  let progression = 0;
  $: loading = progression !== 1;
  const updateProgression = (event: { progression?: number }) => {
    if (event.progression === undefined) {
      return;
    }
    progression = event.progression;
  };

  onMount(async () => {
    const publicViewer = new PublicViewer("objectViewer");
    publicViewer
      .getEventDispatcher()
      .addEventListener("taskCompleted", updateProgression);
    publicViewer.addTasks({
      parallelTasks: [
        {
          task: async () => {
            await publicViewer.loadIbl(data.irradiance, data.radiance);
            publicViewer.viewer.setIblSpace(IblSpace.View);
          },
        },
      ],
    });
    publicViewer.viewer.fov = 50;
    publicViewer.viewer.verticalRatio = VERTICAL_RATIO_LIMIT;
    configureViewOffset(publicViewer);
    await publicViewer.launch();

    publicViewerWritable.set(publicViewer);
  });

  onDestroy(async () => {
    const publicViewer = await getPublicViewer();
    publicViewer
      .getEventDispatcher()
      .removeEventListener("taskCompleted", updateProgression);
    publicViewer.dispose();
  });
</script>

<div class="absolute h-full w-full" out:fade|global={{ duration: 0 }}>
  <div
    style:visibility={loading ? "hidden" : "visible"}
    class="relative flex h-full w-full items-center justify-center"
    id="objectViewer"
  />
</div>

<slot />
