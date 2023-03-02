import type { Writable } from "svelte/store";

export const waitForState = async <T>(state: Writable<T>, stateValue: T) => new Promise<void>((resolve) => {
  const unsubscribe = state.subscribe((value: T) => {
    if (stateValue != value) {
      return;
    }
    unsubscribe();
    resolve();
  })

})