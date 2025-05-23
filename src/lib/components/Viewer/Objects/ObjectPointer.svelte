<script lang="ts">
  import { THREE } from "@s0rt/3d-viewer";
  import { onDestroy, onMount, type Snippet } from "svelte";
  import { getObjectUnderMouse } from "./getObjectUnderMouse";
  import { getContext } from "svelte";
  import throttle from "lodash.throttle";
  import type { PublicViewerContext } from "../PublicViewerContext";

  interface Props {
    children: Snippet;
    pointableObjects: THREE.Object3D[];
    selectableObjects: THREE.Object3D[];
    pointedObject: null | THREE.Object3D;
    touchedObject: null | THREE.Object3D;
  }

  let {
    children,
    pointableObjects,
    selectableObjects,
    pointedObject = $bindable(),
    touchedObject = $bindable(),
  }: Props = $props();

  const { viewer } = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  ).getPublicViewerSync();
  const { camera, renderer } = viewer;
  const { domElement } = renderer;

  const onMouseMove = (event: PointerEvent) => {
    if (event.pointerType != "mouse") {
      return;
    }

    const { offsetX, offsetY } = event;

    onPointerMove(offsetX, offsetY);
  };

  const onPointerMove = throttle((offsetX: number, offsetY: number) => {
    const pointer = new THREE.Vector2(
      (offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(offsetY / domElement.offsetHeight) * 2.0 + 1.0,
    );
    const objectUnderMouse = getObjectUnderMouse(
      pointer,
      camera,
      pointableObjects,
    );
    pointedObject = objectUnderMouse;
  }, 100);

  let touchedDownObject: null | THREE.Object3D;
  let lastPointer: null | THREE.Vector2 = null;
  const onTouchDown = (event: PointerEvent) => {
    if (event.pointerType != "touch") {
      return;
    }

    const { offsetX, offsetY } = event;

    const pointer = new THREE.Vector2(
      (offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(offsetY / domElement.offsetHeight) * 2.0 + 1.0,
    );
    const objectUnderMouse = getObjectUnderMouse(
      pointer,
      camera,
      pointableObjects,
    );
    lastPointer = pointer;

    if (!objectUnderMouse || !selectableObjects.includes(objectUnderMouse)) {
      touchedDownObject = null;
      return;
    }

    touchedDownObject = objectUnderMouse;
  };

  const onTouchUp = (event: PointerEvent) => {
    if (event.pointerType != "touch") {
      return;
    }

    const { offsetX, offsetY } = event;

    const pointer = new THREE.Vector2(
      (offsetX / domElement.offsetWidth) * 2.0 - 1.0,
      -(offsetY / domElement.offsetHeight) * 2.0 + 1.0,
    );
    const objectUnderMouse = getObjectUnderMouse(
      pointer,
      camera,
      pointableObjects,
    );

    if (lastPointer !== null && !pointer.equals(lastPointer)) {
      return;
    }
    lastPointer = null;

    touchedObject =
      objectUnderMouse == touchedDownObject ? touchedDownObject : null;
  };

  onMount(() => {
    domElement.addEventListener("pointermove", onMouseMove);
    domElement.addEventListener("pointerdown", onTouchDown);
    domElement.addEventListener("pointerup", onTouchUp);
    domElement.addEventListener("pointerleave", onTouchUp);
  });

  onDestroy(() => {
    domElement.removeEventListener("pointermove", onMouseMove);
    domElement.removeEventListener("pointerdown", onTouchDown);
    domElement.removeEventListener("pointerup", onTouchUp);
    domElement.removeEventListener("pointerleave", onTouchUp);
  });
</script>

{@render children()}
