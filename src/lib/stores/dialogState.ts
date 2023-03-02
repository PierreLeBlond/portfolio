import { page } from "$app/stores";
import { viewerState } from "$lib/stores/viewerState"
import { derived, type Readable } from "svelte/store";
import type { ViewerState } from "$lib/state/State";
import { pageDialog } from "./pageDialog";
import { pointedPathname } from "./pathname";

export const dialogState: Readable<string> = derived([page, viewerState, pointedPathname, pageDialog], ([page, viewerState, pointedPathname, pageDialog]) => {
  let dialog = page.data['dialog'];
  if (pageDialog) {
    dialog = pageDialog;
  }

  const pointedPage = page.data['pages'].find(({ pathname }: { pathname: string }) => pathname == pointedPathname);
  if (pointedPage) {
    dialog = pointedPage.label;
  }

  const stateMap: Map<ViewerState, string> = new Map([
    ['flying', 'WhoooOOOooosh'],
    ['navigating', 'And...'],
    ['ready', dialog]
  ]);

  return stateMap.get(viewerState) ?? "Hum, there should be a dialog there...";
});