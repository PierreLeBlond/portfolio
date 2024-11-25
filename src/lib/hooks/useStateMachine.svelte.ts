import { globalState } from "$lib/state/globalState.svelte";

export type AppState =
  | "mounting"
  | "idle"
  | "navigating"
  | "navigatingWhileFlying"
  | "flying"
  | "disolving"
  | "loading";

export type AppEvent =
  | "mounted"
  | "navigate"
  | "navigated"
  | "land"
  | "disolved"
  | "load"
  | "loaded";

export const useStateMachine = (data: {
  camera: any;
  controlMinDistance: number;
  isHome: boolean;
}) => {
  type Action = () => void;

  let state = $state<AppState>("mounting");

  const machine: Map<
    AppState,
    Map<AppEvent, { state: AppState; action?: Action }>
  > = new Map([
    ["mounting", new Map()],
    ["idle", new Map()],
    ["navigating", new Map()],
    ["navigatingWhileFlying", new Map()],
    ["flying", new Map()],
    ["disolving", new Map()],
    ["loading", new Map()],
  ]);

  const setCamera = () => {
    if (!data.camera) {
      return;
    }
    const { position, target, yOffset } = data.camera;
    const controlMinDistance = data.controlMinDistance;
    globalState.cameraTarget = {
      position: position,
      target: target,
      yOffset: yOffset || 0,
      controlMinDistance: controlMinDistance,
    };
  };
  setCamera();

  const playViewer = () => {
    if (!globalState.publicViewer) {
      return;
    }
    globalState.publicViewer.play();
  };
  const pauseViewer = () => {
    const isHome = data.isHome;
    if (!globalState.publicViewer || isHome) {
      return;
    }
    globalState.publicViewer.pause();
  };

  const disolveSelectedObject = () => {
    if (
      !globalState.selectedObject ||
      !globalState.selectedObject.userData["disolveRatio"]
    ) {
      trigger("disolved");
      return;
    }
  };

  machine.get("mounting")?.set("mounted", {
    state: "flying",
    action: () => {
      playViewer();
      setCamera();
    },
  });
  machine.get("idle")?.set("navigate", {
    state: "navigating",
    action: () => {
      playViewer();
    },
  });
  machine.get("idle")?.set("load", {
    state: "loading",
  });
  machine.get("navigating")?.set("navigated", {
    state: "flying",
    action: () => {
      setCamera();
    },
  });
  machine.get("flying")?.set("land", {
    state: "disolving",
    action: () => {
      disolveSelectedObject();
    },
  });
  machine.get("flying")?.set("navigate", {
    state: "navigatingWhileFlying",
  });
  machine.get("navigatingWhileFlying")?.set("navigated", {
    state: "flying",
    action: () => {
      setCamera();
    },
  });
  machine.get("disolving")?.set("disolved", {
    state: "idle",
    action: () => {
      pauseViewer();
    },
  });
  machine.get("disolving")?.set("navigate", {
    state: "navigating",
  });
  machine.get("loading")?.set("loaded", {
    state: "idle",
  });
  machine.get("loading")?.set("navigate", {
    state: "navigating",
    action: () => {
      playViewer();
    },
  });

  const trigger = (event: AppEvent) => {
    if (event == null) {
      return;
    }

    const statePath = machine.get(state);
    if (!statePath) {
      throw new Error(`AppMachine does not have ${state} state`);
    }

    const nextState = statePath.get(event);

    if (!nextState) {
      return;
    }

    state = nextState.state;

    if (nextState.action) {
      nextState.action();
    }
  };

  return {
    get state() {
      return state;
    },
    trigger,
  };
};
