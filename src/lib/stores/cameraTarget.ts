import type { THREE } from "@s0rt/3d-viewer";
import { writable, type Writable } from "svelte/store";

export const cameraTarget: Writable<null | {
  target: THREE.Vector3;
  position: THREE.Vector3;
  controlMinDistance: number;
  yOffset: number;
}> = writable(null);
