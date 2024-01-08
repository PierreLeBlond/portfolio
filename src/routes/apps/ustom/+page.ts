import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(0.3627, 1.766, -0.894),
      target: new THREE.Vector3(0.3627, 1.766, -1.348),
    },
  };
};
