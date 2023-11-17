<script lang="ts">
  import type { PublicViewerContext } from "$lib/layout/Viewer/PublicViewerContext";
  import { appEvent } from "$lib/state/appEvent";
  import { getContext, onDestroy } from "svelte";
  import { onMount } from "svelte";
  import type App from "chess";
  import Description from "$lib/layout/Description.svelte";
  import { appState } from "$lib/state/appState";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );
  const renderingsPublicViewerContext = getContext<PublicViewerContext>(
    "renderingsPublicViewerContext",
  );

  let chessboard: App;
  onMount(async () => {
    appEvent.set("load");
    const mainPublicViewer = await mainPublicViewerContext.getPublicViewer();
    const renderingsPublicViewer =
      await renderingsPublicViewerContext.getPublicViewer();

    const App = (await import("chess")).default;
    chessboard = new App(renderingsPublicViewer);
    await chessboard.start();

    const { camera, controls } = renderingsPublicViewer.viewer;

    const { viewer } = mainPublicViewer;
    const roomCamera = viewer.camera;
    const roomControls = viewer.controls;

    camera.fov = roomCamera.fov;
    camera.updateProjectionMatrix();

    const roomPosition = roomCamera.position.clone();
    const offset = roomControls.target.clone();

    controls.minDistance = 0.01;
    controls.maxDistance = Infinity;
    camera.position.copy(roomPosition.add(offset.negate()));
    controls.update();

    controls.enableZoom = false;
    const polarAngle = controls.getPolarAngle();
    controls.minPolarAngle = polarAngle;
    controls.maxPolarAngle = polarAngle;

    const { scene } = renderingsPublicViewer.viewer;

    const object = scene.getObjectByName("main");
    if (!object) {
      throw new Error("Object does not exists");
    }

    object.visible = false;

    await renderingsPublicViewer.viewer.resolveObject(object, {
      duration: 0.5,
      delay: 0.1,
      color: 0xfb923c,
    });
    appEvent.set("loaded");
  });

  onDestroy(async () => {
    if (chessboard) {
      chessboard.stop();
    }
  });
</script>

<Description>
  <div class="flex h-full w-full flex-col gap-y-4 p-4">
    <h1 class="text-2xl font-bold">Render</h1>
    <h2 class="self-end pb-4 text-xl">chessboard rendering</h2>
    <p>A Three.js rendering of a chessboard, animated.</p>
    <p>Build in blender.</p>
    <p>Lighting is done with image based lighting.</p>

    {#if $appState === "loading"}
      <p class="animate-pulse text-center font-bold">
        Thinking about my next move...
      </p>
    {:else}
      <p class="text-center">You can't play with it yet though :/</p>
    {/if}
  </div>
</Description>
