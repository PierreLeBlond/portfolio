import { globalState } from "$lib/state/globalState.svelte";
import { THREE, type OffsetCamera, type Scene } from "@s0rt/3d-viewer";
import { cubicInOut } from "svelte/easing";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.d.ts";
import type { AppEvent } from "./useStateMachine.svelte";

const DURATION = 1500;

export const useCameraAnimation = ({
  scene,
  camera,
  controls,
  trigger,
}: {
  scene: Scene;
  camera: OffsetCamera;
  controls: OrbitControls;
  trigger: (event: AppEvent) => void;
}) => {
  let positionStart = new THREE.Vector3();
  let positionEnd = new THREE.Vector3();
  let targetStart = new THREE.Vector3();
  let targetEnd = new THREE.Vector3();
  let yOffsetStart = 0;
  let yOffsetEnd = 0;
  let minDistanceEnd = 0;
  let time = 0;

  const onAnimate = ({ delta }: { delta: number }) => {
    if (time == 1.0) {
      endCameraAnimation();
      return;
    }

    time = Math.min(1.0, time + (delta * 1000.0) / DURATION);
    const easedTime = cubicInOut(time);
    camera.position.lerpVectors(positionStart, positionEnd, easedTime);
    controls.target.lerpVectors(targetStart, targetEnd, easedTime);
    controls.update();

    camera.yOffset = yOffsetStart + (yOffsetEnd - yOffsetStart) * easedTime;
    camera.updateProjectionMatrix();
  };

  const endCameraAnimation = () => {
    scene.getEventDispatcher().removeEventListener("animate", onAnimate);

    controls.minDistance = minDistanceEnd;

    controls.enableDamping = true;
    controls.enabled = true;

    trigger("land");
  };

  $effect(() => {
    if (!globalState.cameraTarget) {
      return;
    }

    const { target, position, controlMinDistance, yOffset } =
      globalState.cameraTarget;

    time = 0.0;

    controls.enabled = false;
    controls.enableDamping = false;

    controls.minDistance = 0;

    positionStart.copy(camera.position);
    targetStart.copy(controls.target);
    yOffsetStart = camera.yOffset;

    positionEnd.copy(position);
    targetEnd.copy(target);
    yOffsetEnd = yOffset;

    minDistanceEnd = controlMinDistance;

    if (!scene.getEventDispatcher().hasEventListener("animate", onAnimate)) {
      scene.getEventDispatcher().addEventListener("animate", onAnimate);
    }
  });
};
