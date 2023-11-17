import { appState, type AppState } from "$lib/state/appState";
import { derived, type Readable } from "svelte/store";
import { currentPage, pointedPage, touchedPage } from "./selectedPage";

export const dialogState: Readable<string | null> = derived(
  [appState, currentPage, pointedPage, touchedPage],
  ([state, currentPage, pointedPage, touchedPage]) => {
    let dialog = null;
    if (currentPage) {
      dialog = currentPage.label;
    }
    if (touchedPage) {
      dialog = touchedPage.label;
    }
    if (pointedPage) {
      dialog = pointedPage.label;
    }

    const stateMap: Map<AppState, string | null> = new Map([
      ["flying", "WhoooOOOooosh"],
      ["navigating", "And..."],
      ["navigatingWhileFlying", "And..."],
      ["loading", dialog],
      ["idle", dialog],
      ["disolving", dialog],
    ]);

    return stateMap.get(state) || null;
  },
);
