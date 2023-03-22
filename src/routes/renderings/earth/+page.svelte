<script lang="ts">
  import { pageDialog } from '$lib/stores/pageDialog';
  import { THREE } from '@s0rt/3d-viewer';
  import { getContext, onDestroy, onMount } from 'svelte';

  const mainPublicViewerContext = getContext('mainPublicViewerContext');
  const renderingsPublicViewerContext = getContext('renderingsPublicViewerContext');

  let earth: { start: () => any; stop: () => void };
  onMount(async () => {
    pageDialog.set('Creating the earth, that might take a few days');
    const mainPublicViewer = await mainPublicViewerContext.getPublicViewer();
    const renderingsPublicViewer = await renderingsPublicViewerContext.getPublicViewer();

    const Earth = (await import('https://app.pierrelespingal.xyz/earth/v2.0.1/lib/index.js')).default;
    earth = new Earth(renderingsPublicViewer);
    await earth.start();

    const { camera, controls } = renderingsPublicViewer.viewer;
    camera.fov = 50;
    camera.updateProjectionMatrix();

    const earthScene = renderingsPublicViewer.viewer.getScene('earth-main');
    if (!earthScene) {
      throw new Error('earthScene does not exists');
    }

    const detectorScene = renderingsPublicViewer.viewer.getScene('earth-detector');
    if (!detectorScene) {
      throw new Error('detectorScene does not exists');
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

    const object = earthScene.getObjectByName('earth');
    if (!object) {
      throw new Error('Object does not exists');
    }

    object.visible = false;

    await renderingsPublicViewer.viewer.resolveObject(object, { duration: 0.5, delay: 0.1, color: 0xfb923c });

    earth.addEventListener('country', ({ message }: { message: string }) => {
      pageDialog.set(message ? `That's ${message.toLowerCase()}` : null);
    });

    pageDialog.set(null);
  });

  onDestroy(() => {
    pageDialog.set(null);
    if (earth) {
      earth.stop();
    }
  });
</script>
