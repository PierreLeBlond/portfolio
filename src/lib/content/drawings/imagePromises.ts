import { writable, type Writable } from "svelte/store";

export const imagePromises: Writable<
  Record<string, Promise<HTMLImageElement>>
> = writable({});
