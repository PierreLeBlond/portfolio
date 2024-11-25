import type { AppEvent, AppState } from "$lib/hooks/useStateMachine.svelte";
import { getContext, setContext } from "svelte";

let appKey = Symbol("app");

type AppContext = {
  state: AppState;
  trigger: (event: AppEvent) => void;
};

export const setAppContext = (app: AppContext) => {
  setContext(appKey, app);
};

export const getAppContext = (): AppContext => {
  return getContext("app");
};
