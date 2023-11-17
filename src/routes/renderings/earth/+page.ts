import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(-1.065, 2.07, -0.305),
      target: new THREE.Vector3(-1.24, 2.02, -0.64),
    },
  };
};
