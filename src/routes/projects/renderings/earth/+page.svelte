<script lang="ts">
  import type { PublicViewerContext } from "$lib/components/Viewer/PublicViewerContext";
  import { appEvent } from "$lib/state/appEvent";
  import { pageDialog } from "$lib/stores/pageDialog";
  import { getContext, onDestroy, onMount } from "svelte";
  import { THREE } from "@s0rt/3d-viewer";
  import type App from "earth";
  import { appState } from "$lib/state/appState";
  import { fade } from "svelte/transition";
  import Project from "$lib/components/Project.svelte";

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
    const { viewer } = mainPublicViewer;
    const roomCamera = viewer.camera;
    const roomControls = viewer.controls;

    camera.fov = roomCamera.fov;
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

    earth.getEventDispatcher().addEventListener("country", ({ message }) => {
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

<Project title="Earth" githubLink="https://github.com/PierreLeBlond/earth">
  <div class="flex w-full flex-col" slot="hud">
    {#if $appState === "loading"}
      <p>Nothing appears yet, but you know some hidden works are happening.</p>
      <p>You are willing to wait...</p>
    {:else}
      <p in:fade>It's a globe. It reflects the room it's in.</p>
      <p in:fade>There is some <b>three.js</b> magic happening for sure.</p>
      <p in:fade>You feel the urge to hover a country.</p>
      {#if country}
        <p in:fade>
          Doing so, you recognize it as <b>{country}</b>.
        </p>
      {/if}
    {/if}
  </div>
  <div slot="excerpt">
    {#if country}
      <p in:fade class="overflow-hidden text-ellipsis text-nowrap">
        You recognize it as <b>{country}</b>.
      </p>
    {:else}
      <p in:fade>You feel the urge to hover a country.</p>
    {/if}
  </div>
</Project>
