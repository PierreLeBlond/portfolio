import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";
import bboy from "./assets/bboy.svg";
import lalpine from "./assets/lalpine.svg";
import lecorp from "./assets/lecorp.svg";
import logophtalmo from "./assets/logophtalmo.svg";

export const load: PageLoad = () => {
  return {
    urls: [bboy, lalpine, lecorp, logophtalmo],
    texts: [
      "a breakdance association",
      "a brass band",
      "a good friend evil corporation",
      "an ophtalmology center",
    ],
    camera: {
      position: new THREE.Vector3(-0.705, 1.097, 0.6375),
      target: new THREE.Vector3(-1.05, 1.097, 0.6375),
    },
  };
};
