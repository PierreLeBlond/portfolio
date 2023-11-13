import { writable, type Writable } from "svelte/store";

export type AppEvent =
  | "mounted"
  | "introduced"
  | "navigate"
  | "navigated"
  | "land"
  | "disolved"
  | "load"
  | "loaded";
export const appEvent: Writable<AppEvent | null> = writable(null);
