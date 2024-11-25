import { OffsetCamera } from "@s0rt/3d-viewer";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.d.ts";

export const configureCamera = (
  camera: OffsetCamera,
  controls: OrbitControls,
) => {
  camera.position.set(4.27, 4.16, 5.12);
  camera.near = 0.01;
  camera.far = 15;
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
};
