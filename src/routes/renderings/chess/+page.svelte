<script lang="ts">
  import { pageDialog } from '$lib/stores/pageDialog';
  import { pageState } from '$lib/stores/pageState';
  import { getContext, onDestroy } from 'svelte';
  import { onMount } from 'svelte';

  const mainPublicViewerContext = getContext('mainPublicViewerContext');
  const renderingsPublicViewerContext = getContext('renderingsPublicViewerContext');

  let chessboard: { start: () => any; stop: () => void };
  onMount(async () => {
    pageDialog.set('Thinking about my next move...');
    pageState.set('loading');
    const mainPublicViewer = await mainPublicViewerContext.getPublicViewer();
    const renderingsPublicViewer = await renderingsPublicViewerContext.getPublicViewer();

    const Chessboard = (await import('https://app.pierrelespingal.xyz/chess/v2.2.0/lib/index.js')).default;
    chessboard = new Chessboard(renderingsPublicViewer);
    await chessboard.start();

    const { camera, controls } = renderingsPublicViewer.viewer;
    camera.fov = 50;
    camera.updateProjectionMatrix();

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

    const { scene } = renderingsPublicViewer.viewer;

    const object = scene.getObjectByName('main');
    if (!object) {
      throw new Error('Object does not exists');
    }

    object.visible = false;

    await renderingsPublicViewer.viewer.resolveObject(object, { duration: 0.5, delay: 0.1, color: 0xfb923c });
    pageState.set('ready');
    pageDialog.set(null);
  });

  onDestroy(async () => {
    if (chessboard) {
      chessboard.stop();
    }
  });
</script>
