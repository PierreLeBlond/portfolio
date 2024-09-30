<script lang="ts">
  import { THREE } from "@s0rt/3d-viewer";
  import { getContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import type { PublicViewerContext } from "../PublicViewerContext";
  import ObjectOverlay from "./overlay/ObjectOverlay.svelte";

  const { viewer } = getContext<PublicViewerContext>(
    "mainPublicViewerContext",
  ).getPublicViewerSync();
  const { scene } = viewer;

  export let object: THREE.Object3D;

  export let highlighted = false;
  export let entered = false;

  type ActionName =
    | "LiftAction"
    | "UnliftAction"
    | "OutAction"
    | "LiftOutAction"
    | "InAction";
  const actionNames: ActionName[] = [
    "LiftAction",
    "UnliftAction",
    "OutAction",
    "LiftOutAction",
    "InAction",
  ];

  const loopedAction = [
    "LogoCube|LiftAction",
    "InkCube|LiftAction",
    "Earth|LiftAction",
    "Github|LiftAction",
    "At|LiftAction",
  ];

  const mixer = new THREE.AnimationMixer(object);
  scene.getEventDispatcher().addEventListener("animate", ({ delta }) => {
    mixer.update(delta);
  });

  const actionsMap = new Map<ActionName, THREE.AnimationAction | null>(
    actionNames.map((actionName: ActionName) => {
      const clipName = `${object.name}|${actionName}`;
      const clip = THREE.AnimationClip.findByName(object.animations, clipName);
      if (!clip) {
        return [actionName, null];
      }

      const action = mixer.clipAction(clip);
      const loopMode = loopedAction.includes(clipName)
        ? THREE.LoopRepeat
        : THREE.LoopOnce;
      action.setLoop(loopMode, Infinity);
      action.clampWhenFinished = true;
      action.setEffectiveTimeScale(2.0);
      return [actionName, action];
    }),
  );

  type ObjectState = "idle" | "highlighted" | "entered";
  type ObjectEvent = "highlight" | "unhighlight" | "enter" | "leave";
  type StateChange = {
    state: ObjectState;
    actionName: ActionName;
  };

  let runningStateChange: StateChange | null = null;
  let waitingStateChange: StateChange | null = null;

  const playAction = () => {
    if (!waitingStateChange) {
      return;
    }

    if (runningStateChange) {
      const { actionName } = runningStateChange;
      const runningAction = actionsMap.get(actionName);

      if (runningAction) {
        runningAction.stop();
      }
    }

    const { actionName } = waitingStateChange;
    const waitingAction = actionsMap.get(actionName);

    if (waitingAction) {
      waitingAction.play();
    }

    runningStateChange = waitingStateChange;
    waitingStateChange = null;
  };

  mixer.addEventListener("loop", playAction);
  mixer.addEventListener("finished", playAction);

  const scheduleStateChange = (stateChange: StateChange) => {
    // If multiple state change resulted in the same current action being scheduled, do nothing
    if (runningStateChange?.state == stateChange.state) {
      waitingStateChange = null;
      return;
    }

    waitingStateChange = stateChange;

    // Wait for running action to finish before playing the new one
    if (
      runningStateChange &&
      actionsMap.get(runningStateChange.actionName)?.isRunning()
    ) {
      return;
    }

    playAction();
  };

  const objectState: Writable<ObjectState> = writable("idle");
  const objectEvent: Writable<ObjectEvent | null> = writable(null);
  const machine: Map<
    ObjectState,
    Map<ObjectEvent, { state: ObjectState; actionName: ActionName }>
  > = new Map();

  machine.set("idle", new Map());

  machine.get("idle")?.set("enter", {
    state: "entered",
    actionName: "LiftOutAction",
  });

  machine.get("idle")?.set("highlight", {
    state: "highlighted",
    actionName: "LiftAction",
  });

  machine.set("highlighted", new Map());

  machine.get("highlighted")?.set("enter", {
    state: "entered",
    actionName: "OutAction",
  });

  machine.get("highlighted")?.set("unhighlight", {
    state: "idle",
    actionName: "UnliftAction",
  });

  machine.set("entered", new Map());

  machine.get("entered")?.set("leave", {
    state: "idle",
    actionName: "InAction",
  });

  objectEvent.subscribe((event) => {
    if (event == null) {
      return;
    }

    const statePath = machine.get($objectState);
    if (!statePath) {
      throw new Error(`AppMachine does not have ${$objectState} state`);
    }

    const nextState = statePath.get(event);

    if (!nextState) {
      return;
    }

    scheduleStateChange(nextState);
    $objectState = nextState.state;
  });

  const onEnteredChange = (entered: boolean) => {
    objectEvent.set(entered ? "enter" : "leave");
  };

  const onHighlightedChange = (highlighted: boolean) => {
    objectEvent.set(highlighted ? "highlight" : "unhighlight");
  };

  $: onHighlightedChange(highlighted);
  $: onEnteredChange(entered);
</script>

{#if highlighted}
  <ObjectOverlay {object}></ObjectOverlay>
{/if}
