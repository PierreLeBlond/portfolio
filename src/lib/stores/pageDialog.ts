import { writable, type Writable } from "svelte/store";

export const pageDialog: Writable<string | null> = writable(null);
