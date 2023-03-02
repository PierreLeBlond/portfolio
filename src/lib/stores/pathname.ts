import { writable, type Writable } from 'svelte/store';

export const pointedPathname: Writable<null | string> = writable(null);
export const selectedPathname: Writable<null | string> = writable(null);