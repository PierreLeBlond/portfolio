import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(-0.037207, 2.066, -0.894),
      target: new THREE.Vector3(-0.037207, 2.066, -1.348),
    },
  };
};
