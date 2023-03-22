<script lang="ts">
  import type { THREE } from '@s0rt/3d-viewer';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';

  const dispatch = createEventDispatcher<{ selected: { object: THREE.Object3D } }>();

  const LEFT_BUTTON = 0;

  export let pointedObject: null | THREE.Object3D = null;
  export let touchedObject: null | THREE.Object3D = null;
  export let selectableObjects: THREE.Object3D[];

  let clickedObject: null | THREE.Object3D;
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType != 'mouse' || event.button !== LEFT_BUTTON) {
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

  const onPointerUp = (event: PointerEvent) => {
    if (event.pointerType != 'mouse' || event.button !== LEFT_BUTTON) {
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

  const onLetsGoButtonDown = () => {
    if (!touchedObject) {
      return;
    }
    const object = touchedObject;
    dispatch('selected', { object });
  };
</script>

<svelte:window
  on:pointerdown={onPointerDown}
  on:pointerup={onPointerUp}
/>

{#if touchedObject}
  <div
    transition:fly={{ y: 48 }}
    on:pointerdown={onLetsGoButtonDown}
    class="fixed bottom-20 left-1/3 flex h-12 w-1/3 origin-center items-center justify-center rounded border border-white bg-black shadow"
  >
    <p class="text-white">Let's go!</p>
  </div>
{/if}
