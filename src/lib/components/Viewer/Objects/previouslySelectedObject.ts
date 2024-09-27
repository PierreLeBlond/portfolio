import type { THREE } from "@s0rt/3d-viewer";
import { writable, type Writable } from "svelte/store";

export const previouslySelectedObject: Writable<THREE.Object3D | null> =
  writable(null);
