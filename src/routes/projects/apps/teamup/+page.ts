import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(0.028822, 1.57225, -0.894),
      target: new THREE.Vector3(0.028822, 1.57225, -1.34821),
    },
  };
};
