import { THREE } from "@s0rt/3d-viewer";
import type { PageLoad } from "./$types";
import game from "./assets/game.png";
import home from "./assets/home.png";
import team from "./assets/team.png";
import tournament from "./assets/tournament.png";

export const load: PageLoad = () => {
  return {
    urls: [home, tournament, game, team],
    camera: {
      position: new THREE.Vector3(0.028822, 1.57225, -0.894),
      target: new THREE.Vector3(0.028822, 1.57225, -1.34821),
    },
  };
};
