import { writable, type Writable } from "svelte/store";

export type AppState =
  | 'mounting'
  | 'introducing'
  | 'idle'
  | 'navigating'
  | 'navigatingWhileFlying'
  | 'flying'
  | 'disolving'
  | 'loading';
export const appState: Writable<AppState> = writable('mounting');