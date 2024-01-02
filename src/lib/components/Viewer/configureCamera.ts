import { appEvent } from "$lib/state/appEvent";
import { cameraTarget } from "$lib/stores/cameraTarget";
import { THREE, type Scene } from "@s0rt/3d-viewer";
import { cubicInOut } from "svelte/easing";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.d.ts";

const DURATION = 1500;

export const configureCamera = (
  scene: Scene,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
) => {
  camera.position.set(3.75, 3.75, 4.5);
  camera.near = 0.01;
  camera.far = 10;
  camera.fov = 50;
  camera.updateProjectionMatrix();

  controls.target.set(0, 1, 0);
  controls.minDistance = 0;
  controls.maxDistance = 7.5;

  controls.maxPolarAngle = 1.5 * Math.PI;

  controls.enablePan = false;
  controls.rotateSpeed = 0.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  let positionStart = new THREE.Vector3();
  let positionEnd = new THREE.Vector3();
  let targetStart = new THREE.Vector3();
  let targetEnd = new THREE.Vector3();
  let minDistanceEnd = 0;
  let time = 0;

  const onAnimate = (event: THREE.Event) => {
    const { delta } = event;

    if (time == 1.0) {
      endCameraAnimation();
      return;
    }

    time = Math.min(1.0, time + (delta * 1000.0) / DURATION);
    const easedTime = cubicInOut(time);
    camera.position.lerpVectors(positionStart, positionEnd, easedTime);
    controls.target.lerpVectors(targetStart, targetEnd, easedTime);
    controls.update();
  };

  const endCameraAnimation = () => {
    scene.removeEventListener("animate", onAnimate);

    controls.minDistance = minDistanceEnd;

    controls.enableDamping = true;
    controls.enabled = true;

    appEvent.set("land");
  };

  cameraTarget.subscribe((payload) => {
    if (!payload) {
      return;
    }

    time = 0.0;

    controls.enabled = false;
    controls.enableDamping = false;

    controls.minDistance = 0;

    positionStart.copy(camera.position);
    targetStart.copy(controls.target);

    positionEnd.copy(payload.position);
    targetEnd.copy(payload.target);

    minDistanceEnd = payload.controlMinDistance;

    if (!scene.hasEventListener("animate", onAnimate)) {
      scene.addEventListener("animate", onAnimate);
    }
  });
};
