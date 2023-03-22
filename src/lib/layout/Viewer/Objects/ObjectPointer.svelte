<script lang="ts">
  import { THREE } from '@s0rt/3d-viewer';
  import { onDestroy, onMount } from 'svelte';
  import { getObjectUnderMouse } from './getObjectUnderMouse';
  import { getContext } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import throttle from 'lodash.throttle';
  import { afterNavigate } from '$app/navigation';

  const dispatch = createEventDispatcher<{ pointed: { pathname: string } }>();

  const { viewer } = getContext('mainPublicViewerContext').getPublicViewerSync();
  const { camera, renderer } = viewer;
  const { domElement } = renderer;

  export let pointableObjects: THREE.Object3D[];
  export let pointedObject: null | THREE.Object3D = null;
  export let touchedObject: null | THREE.Object3D = null;
  export let selectableObjects: THREE.Object3D[];

  const onMouseMove = (event: PointerEvent) => {
    if (event.pointerType != 'mouse') {
      return;
    }

    const { offsetX, offsetY } = event;

    onPointerMove(offsetX, offsetY);
  };

  const onPointerMove = throttle((offsetX: number, offsetY: number) => {
    const pointer = new THREE.Vector2(
      (offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(offsetY / domElement.offsetHeight) * 2.0 + 1.0
    );
    const objectUnderMouse = getObjectUnderMouse(pointer, camera, pointableObjects);
    pointedObject = objectUnderMouse;
    dispatch('pointed', { pathname: pointedObject ? pointedObject.userData['pathname'] : null });
  }, 100);

  let touchedDownObject: null | THREE.Object3D;
  const onTouchDown = (event: PointerEvent) => {
    if (event.pointerType != 'touch') {
      return;
    }

    const { offsetX, offsetY } = event;

    const pointer = new THREE.Vector2(
      (offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(offsetY / domElement.offsetHeight) * 2.0 + 1.0
    );
    const objectUnderMouse = getObjectUnderMouse(pointer, camera, pointableObjects);

    if (!selectableObjects.includes(objectUnderMouse)) {
      touchedDownObject = null;
      return;
    }

    touchedDownObject = objectUnderMouse;
  };

  const onTouchUp = (event: PointerEvent) => {
    if (event.pointerType != 'touch') {
      return;
    }

    const { offsetX, offsetY } = event;

    const pointer = new THREE.Vector2(
      (offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(offsetY / domElement.offsetHeight) * 2.0 + 1.0
    );
    const objectUnderMouse = getObjectUnderMouse(pointer, camera, pointableObjects);

    touchedObject = objectUnderMouse == touchedDownObject ? touchedDownObject : null;
    dispatch('pointed', { pathname: touchedObject?.userData['pathname'] || null });
  };

  onMount(() => {
    domElement.addEventListener('pointermove', onMouseMove);
    domElement.addEventListener('pointerdown', onTouchDown);
    domElement.addEventListener('pointerup', onTouchUp);
  });

  onDestroy(() => {
    domElement.removeEventListener('pointermove', onMouseMove);
    domElement.removeEventListener('pointerdown', onTouchDown);
    domElement.removeEventListener('pointerup', onTouchUp);
  });

  afterNavigate(() => {
    pointedObject = null;
    touchedObject = null;
  });
</script>

<slot />
