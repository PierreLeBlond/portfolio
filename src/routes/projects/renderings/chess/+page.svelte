<script lang="ts">
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import { getContext, onDestroy } from "svelte";
  import { onMount } from "svelte";
  import type App from "chess";
  import Project from "$lib/components/project/Project.svelte";
  import { CHESS_LABEL } from "../../../../constants";
  import { getAppContext } from "$lib/context/appContext";
  import { useDisolve } from "$lib/hooks/useDisolve.svelte";
  import { globalState } from "$lib/state/globalState.svelte";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );
  const renderingsPublicViewerContext = getContext<PublicViewerContext>(
    "renderingsPublicViewerContext",
  );

  let app = getAppContext();

  const { disolve, resolve } = useDisolve(
    app.trigger,
    globalState.selectedObject,
  );

  let chessboard: App;
  onMount(async () => {
    await disolve();
    app.trigger("load");
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
    app.trigger("loaded");
  });

  onDestroy(async () => {
    if (chessboard) {
      chessboard.stop();
    }
    await resolve();
  });
</script>

<Project
  title={CHESS_LABEL}
  githubLink="https://github.com/PierreLeBlond/chessboard"
>
  {#snippet about()}
    <div class="flex w-full flex-col">
      {#if app.state !== "idle"}
        <p>
          You can hear the sound of pieces moving. Maybe of you wait a bit
          longer, you will see something.
        </p>
      {:else}
        <p>
          A chessboard, no pieces are missing. As you reach one of them, sadly,
          they just keep on dancing in place. Hopefuly one day we might be able
          to play with it. Until then, you appreciate the <b>blender</b> made
          composition, presented with <b>three.js</b>.
        </p>
      {/if}
    </div>
  {/snippet}
</Project>
