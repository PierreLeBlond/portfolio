import type { THREE } from '@s0rt/3d-viewer';

export const configureCamera = (camera: THREE.PerspectiveCamera, controls: THREE.OrbitControl) => {
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
}