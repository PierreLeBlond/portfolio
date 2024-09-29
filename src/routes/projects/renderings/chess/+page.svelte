<script lang="ts">
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import { appEvent } from "$lib/state/appEvent";
  import { getContext, onDestroy } from "svelte";
  import { onMount } from "svelte";
  import type App from "chess";
  import { appState } from "$lib/state/appState";
  import Project from "$lib/components/Project.svelte";
  import { CHESS_LABEL } from "../../../../constants";

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

<Project
  title={CHESS_LABEL}
  githubLink="https://github.com/PierreLeBlond/chessboard"
>
  <div class="flex w-full flex-col" slot="hud">
    {#if $appState === "loading"}
      <p>You can hear the sound of pieces moving.</p>
      <p>Maybe of you wait a bit longer, you will see something.</p>
    {:else}
      <p>A chessboard, no pieces are missing.</p>
      <p>
        As you reach one of them, sadly, they just keep on dancing in place.
      </p>
      <p>Hopeffuly one day we might be able to play with it.</p>
      <p>
        Until then, you appreciate the <b>blender</b> made composition,
        presented with <b>three.js</b>.
      </p>
    {/if}
  </div>
</Project>
