import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(1, 1.1, 0.5),
      target: new THREE.Vector3(0.375, 0.972, 0),
    },
  };
};
