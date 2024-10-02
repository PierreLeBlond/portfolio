import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";
import found from "./assets/found.png";
import generate from "./assets/generate.png";
import search from "./assets/search.png";

export const load: PageLoad = () => {
  return {
    screenshots: [generate, search, found],
    camera: {
      position: new THREE.Vector3(0.3627, 1.766, -0.894),
      target: new THREE.Vector3(0.3627, 1.766, -1.348),
    },
  };
};
