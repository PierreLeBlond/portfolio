<script lang="ts">
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import { appEvent } from "$lib/state/appEvent";
  import { pageDialog } from "$lib/stores/pageDialog";
  import { getContext, onDestroy, onMount } from "svelte";
  import { THREE } from "@s0rt/3d-viewer";
  import type App from "earth";
  import DescriptionPanel from "$lib/components/description/DescriptionPanel.svelte";
  import { appState } from "$lib/state/appState";
  import { fade } from "svelte/transition";

  const mainPublicViewerContext = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  );
  const renderingsPublicViewerContext = getContext<PublicViewerContext>(
    "renderingsPublicViewerContext",
  );

  let earth: App;

  let country: string | null = null;

  onMount(async () => {
    appEvent.set("load");
    const mainPublicViewer = await mainPublicViewerContext.getPublicViewer();
    const renderingsPublicViewer =
      await renderingsPublicViewerContext.getPublicViewer();

    const App = (await import("earth")).default;
    earth = new App(renderingsPublicViewer);
    await earth.start();

    const { camera, controls } = renderingsPublicViewer.viewer;
    camera.fov = 50;
    camera.updateProjectionMatrix();

    const earthScene = renderingsPublicViewer.viewer.getScene("earth-main");
    if (!earthScene) {
      throw new Error("earthScene does not exists");
    }

    const detectorScene =
      renderingsPublicViewer.viewer.getScene("earth-detector");
    if (!detectorScene) {
      throw new Error("detectorScene does not exists");
    }

    const scale = new THREE.Vector3(0.106, 0.106, 0.106);
    earthScene.scale.copy(scale);
    detectorScene.scale.copy(scale);

    const { viewer } = mainPublicViewer;
    const roomCamera = viewer.camera;
    const roomControls = viewer.controls;

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

    const object = earthScene.getObjectByName("earth");
    if (!object) {
      throw new Error("Object does not exists");
    }

    object.visible = false;

    await renderingsPublicViewer.viewer.resolveObject(object, {
      duration: 0.5,
      delay: 0.1,
      color: 0xfb923c,
    });

    earth.addEventListener("country", (event: THREE.Event) => {
      const { message } = event;
      country = message ? message.toLowerCase() : null;
    });

    appEvent.set("loaded");
  });

  onDestroy(() => {
    pageDialog.set(null);
    if (earth) {
      earth.stop();
    }
  });
</script>

<DescriptionPanel
  title="3D earth"
  githubLink="https://github.com/PierreLeBlond/earth"
>
  <div class="flex flex-col items-center justify-center gap-y-2">
    <p>
      A Three.js rendering of a globe with country hovering via color picking.
    </p>
    <p>Lighting is done with image based lighting.</p>

    {#if $appState === "loading"}
      <p class="animate-pulse text-center font-bold">
        Creating the earth, might take a few days...
      </p>
    {:else if country !== null}
      <p class="text-center" in:fade>
        You're flying hover <span class="font-bold">{country}</span>
      </p>
    {:else}
      <p class="text-center font-bold">Try hovering a country !</p>
    {/if}
  </div>
</DescriptionPanel>
