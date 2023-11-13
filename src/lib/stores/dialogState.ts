import { page } from "$app/stores";
import { appState, type AppState } from "$lib/state/appState";
import { derived, type Readable } from "svelte/store";
import { pageDialog } from "./pageDialog";
import { pointedPathname } from "./pathname";

export const dialogState: Readable<string> = derived(
  [page, appState, pointedPathname, pageDialog],
  ([page, state, pointedPathname, pageDialog]) => {
    let dialog = page.data["dialog"];
    if (pageDialog) {
      dialog = pageDialog;
    }

    const pointedPage = page.data["pages"].find(
      ({ pathname }: { pathname: string }) => pathname == pointedPathname,
    );
    if (pointedPage) {
      dialog = pointedPage.label;
    }

    const stateMap: Map<AppState, string> = new Map([
      ["flying", "WhoooOOOooosh"],
      ["navigating", "And..."],
      ["navigatingWhileFlying", "And..."],
      ["loading", dialog],
      ["idle", dialog],
      ["disolving", dialog],
    ]);

    return stateMap.get(state) ?? "Hum, there should be a dialog there...";
  },
);
