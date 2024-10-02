import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";
import editNext from "./assets/edit-next.png";
import edit from "./assets/edit.png";
import home from "./assets/home.png";
import readNext from "./assets/read-next.png";
import read from "./assets/read.png";

export const load: PageLoad = () => {
  return {
    screenshots: [home, read, readNext, edit, editNext],
    camera: {
      position: new THREE.Vector3(0.76279, 1.5632, -0.894),
      target: new THREE.Vector3(0.76279, 1.5632, -1.3482),
    },
  };
};
