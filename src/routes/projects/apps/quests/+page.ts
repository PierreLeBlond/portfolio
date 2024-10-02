import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";
import quest from "./assets/quest.png";
import quests from "./assets/quests.png";

export const load: PageLoad = () => {
  return {
    urls: [quests, quest],
    camera: {
      position: new THREE.Vector3(0.66279, 2.1632, -0.894),
      target: new THREE.Vector3(0.66279, 2.1632, -1.3482),
    },
  };
};
