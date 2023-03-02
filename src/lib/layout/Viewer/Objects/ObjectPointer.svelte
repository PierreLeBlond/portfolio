<script lang="ts">
  import { THREE } from '@s0rt/3d-viewer';
  import { onDestroy, onMount } from 'svelte';
  import { getObjectUnderMouse } from './getObjectUnderMouse';
  import { getContext } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import throttle from 'lodash.throttle';

  const dispatch = createEventDispatcher<{ pointed: { pathname: string } }>();

  const { viewer } = getContext('mainPublicViewerContext').getPublicViewerSync();
  const { camera, renderer } = viewer;
  const { domElement } = renderer;

  export let pointableObjects: THREE.Object3D[];
  export let pointedObject: null | THREE.Object3D = null;

  const onPointerMove = throttle((event: MouseEvent) => {
    const pointer = new THREE.Vector2(
      (event.offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(event.offsetY / domElement.offsetHeight) * 2.0 + 1.0
    );
    const objectUnderMouse = getObjectUnderMouse(pointer, camera, pointableObjects);
    pointedObject = objectUnderMouse;
    dispatch('pointed', { pathname: pointedObject ? pointedObject.userData['pathname'] : null });
  }, 100);

  onMount(() => {
    domElement.addEventListener('pointermove', onPointerMove);
  });

  onDestroy(() => {
    domElement.removeEventListener('pointermove', onPointerMove);
  });
</script>

<slot {pointedObject} />
