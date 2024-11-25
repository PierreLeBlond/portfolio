<script lang="ts">
  import type { THREE } from "@s0rt/3d-viewer";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    selected: { object: THREE.Object3D | null };
  }>();

  type Props = {
    onSelected: (object: THREE.Object3D | null) => void;
    pointedObject: THREE.Object3D | null;
    selectableObjects: THREE.Object3D[];
  };

  let { onSelected, pointedObject, selectableObjects }: Props = $props();

  const LEFT_BUTTON = 0;
  const RIGHT_BUTTON = 2;

  let clickedObject: null | THREE.Object3D;
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== LEFT_BUTTON) {
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
    if (event.pointerType !== "mouse") {
      return;
    }

    // Unselect on right mouse click
    if (event.button === RIGHT_BUTTON) {
      dispatch("selected", { object: null });
      onSelected(null);
    }

    if (event.button !== LEFT_BUTTON) {
      return;
    }

    // The pointer has moved, object choice is aborted
    if (clickedObject !== pointedObject) {
      return;
    }

    onSelected(clickedObject);
  };
</script>

<svelte:window on:pointerdown={onPointerDown} on:pointerup={onPointerUp} />
