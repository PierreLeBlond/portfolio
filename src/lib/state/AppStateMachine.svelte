<script lang="ts">
  import { cameraTarget } from "$lib/stores/cameraTarget";
  import { page } from "$app/stores";
  import { publicViewer } from "$lib/stores/publicViewer";
  import { appState, type AppState } from "./appState";
  import { appEvent, type AppEvent } from "./appEvent";
  import { selectedObject } from "$lib/components/Viewer/Objects/selectedObject";
  import { previouslySelectedObject } from "$lib/components/Viewer/Objects/previouslySelectedObject";
  import type { Tweened } from "svelte/motion";

  type Action = () => void;

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
    const { position, target, yOffset } = $page.data["camera"];
    const controlMinDistance = $page.data["controlMinDistance"];
    cameraTarget.set({
      position: position,
      target: target,
      yOffset: yOffset || 0,
      controlMinDistance: controlMinDistance,
    });
  };
  setCamera();

  const playViewer = () => {
    if (!$publicViewer) {
      return;
    }
    $publicViewer.play();
  };
  const pauseViewer = () => {
    const isHome = $page.data["isHome"];
    if (!$publicViewer || isHome) {
      return;
    }
    $publicViewer.pause();
  };

  const disolveSelectedObject = () => {
    if (!$selectedObject || !$selectedObject.userData["disolveRatio"]) {
      appEvent.set("disolved");
      return;
    }

    const disolvingObject = $selectedObject;

    const disolveRatio: Tweened<number> =
      disolvingObject.userData["disolveRatio"];

    disolveRatio.set(0).then(() => {
      appEvent.set("disolved");
    });
  };

  const resolvePreviouslySelectedObject = () => {
    if (
      !$previouslySelectedObject ||
      !$previouslySelectedObject.userData["disolveRatio"]
    ) {
      return;
    }

    const resolvingObject = $previouslySelectedObject;

    const disolveRatio: Tweened<number> =
      resolvingObject.userData["disolveRatio"];

    disolveRatio.set(1);
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
      resolvePreviouslySelectedObject();
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

  appEvent.subscribe((event) => {
    if (event == null) {
      return;
    }

    const statePath = machine.get($appState);
    if (!statePath) {
      throw new Error(`AppMachine does not have ${$appState} state`);
    }

    const nextState = statePath.get(event);

    if (!nextState) {
      return;
    }

    if (nextState.action) {
      nextState.action();
    }

    $appState = nextState.state;
  });
</script>
