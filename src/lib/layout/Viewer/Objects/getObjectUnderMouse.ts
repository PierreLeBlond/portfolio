import { THREE } from "@s0rt/3d-viewer";

const raycaster = new THREE.Raycaster();

export const getObjectUnderMouse = (pointer: THREE.Vector2, camera: THREE.PerspectiveCamera, objects: THREE.Object3D[]): THREE.Object3D | null => {
  raycaster.setFromCamera(pointer, camera);

  const intersectedObjects = raycaster.intersectObjects(objects);

  const closestIntersectedObject = intersectedObjects.shift();

  if (!closestIntersectedObject) {
    return null;
  }

  const object = closestIntersectedObject.object;

  return object.userData['isCollider'] ? object.userData['object'] : object;
}