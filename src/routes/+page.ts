import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(4.27, 4.16, 5.12),
      target: new THREE.Vector3(0, 0.75, 0),
      yOffset: -0.15,
    },
    controlMinDistance: 3.5,
    isHome: true,
  };
};
