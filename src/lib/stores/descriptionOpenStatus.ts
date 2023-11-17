import { writable, type Writable } from "svelte/store";

export const descriptionOpenStatus: Writable<boolean> = writable(false);
