<script lang="ts">
  import type { THREE } from '@s0rt/3d-viewer';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ selected: { object: THREE.Object3D } }>();

  const LEFT_BUTTON = 0;

  export let pointedObject: null | THREE.Object3D = null;
  export let selectableObjects: THREE.Object3D[];

  let clickedObject: null | THREE.Object3D;
  const onPointerDown = (event: MouseEvent) => {
    if (event.button !== LEFT_BUTTON) {
      return;
    }

    if (!pointedObject) {
      return;
    }

    if (!selectableObjects.includes(pointedObject)) {
      return;
    }

    clickedObject = pointedObject;
  };

  const onPointerUp = (event: MouseEvent) => {
    if (event.button !== LEFT_BUTTON) {
      return;
    }

    if (!clickedObject) {
      return;
    }

    // The pointer has moved, object choice is aborted
    if (clickedObject != pointedObject) {
      return;
    }

    dispatch('selected', { object: clickedObject });
  };
</script>

<svelte:window
  on:mousedown={onPointerDown}
  on:mouseup={onPointerUp}
/>
