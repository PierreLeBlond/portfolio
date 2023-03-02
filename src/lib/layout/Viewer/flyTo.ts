import { type Scene, THREE } from "@s0rt/3d-viewer";
import { cubicInOut } from 'svelte/easing';

const DURATION = 1500;

interface Destination {
  position: THREE.Vector3,
  target: THREE.Vector3,
  minDistance: number
}

export const flyTo = async (scene: Scene, camera: THREE.PerspectiveCamera, controls, destination: Destination) => {

  const { position, target, minDistance } = destination;

  let positionStart = new THREE.Vector3();
  let targetStart = new THREE.Vector3();
  let time = 0;

  return new Promise<void>((resolve) => {
    const onAnimate = ({ delta }: { delta: number }) => {
      if (time == 1.0) {
        endCameraAnimation();
        return;
      }

      time = Math.min(1.0, time + (delta * 1000.0) / DURATION);
      const easedTime = cubicInOut(time);
      camera.position.lerpVectors(positionStart, position, easedTime);
      controls.target.lerpVectors(targetStart, target, easedTime);
      controls.update();
    };

    const endCameraAnimation = () => {
      scene.removeEventListener('animate', onAnimate);

      controls.minDistance = minDistance;

      controls.enableDamping = true;
      controls.enabled = true;

      resolve();
    };

    controls.enabled = false;
    controls.enableDamping = false;

    controls.minDistance = 0;

    positionStart.copy(camera.position);
    targetStart.copy(controls.target);

    scene.addEventListener('animate', onAnimate);
  });

}