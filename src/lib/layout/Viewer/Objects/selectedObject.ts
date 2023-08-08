import { writable, type Writable } from "svelte/store";

export const selectedObject: Writable<THREE.Object3D | null> = writable(null);