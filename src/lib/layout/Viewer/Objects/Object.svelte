<script lang="ts">
  import { waitForState } from '$lib/state/waitForState';
  import { viewerState } from '$lib/stores/viewerState';
  import { THREE } from '@s0rt/3d-viewer';
  import { getContext } from 'svelte';

  const { viewer } = getContext('mainPublicViewerContext').getPublicViewerSync();
  const { scene } = viewer;

  export let object: THREE.Object3D;
  export let pointed = false;
  export let selected = false;

  // We want to wait for camera flying before actually deselect the object and play its animation
  let internalSelected = false;
  $: if (selected) {
    internalSelected = true;
  }

  $: if (!selected) {
    waitForState(viewerState, 'flying').then(() => {
      internalSelected = selected;
    });
  }

  type State = 'idle' | 'pointed' | 'selected';
  type ActionName = 'LiftAction' | 'UnliftAction' | 'OutAction' | 'LiftOutAction' | 'InAction';
  const actionNames: ActionName[] = ['LiftAction', 'UnliftAction', 'OutAction', 'LiftOutAction', 'InAction'];

  const loopedAction = [
    'LogoCube|LiftAction',
    'InkCube|LiftAction',
    'Earth|LiftAction',
    'Github|LiftAction',
    'At|LiftAction'
  ];

  let currentState: State = 'idle';

  const mixer = new THREE.AnimationMixer(object);
  scene.addEventListener('animate', (event) => {
    mixer.update(event['delta']);
  });

  const actionsMap = new Map<ActionName, THREE.AnimationAction | null>(
    actionNames.map((actionName: ActionName) => {
      const clipName = `${object.name}|${actionName}`;
      const clip = THREE.AnimationClip.findByName(object.animations, clipName);
      if (!clip) {
        return [actionName, null];
      }

      const action = mixer.clipAction(clip);
      const loopMode = loopedAction.includes(clipName) ? THREE.LoopRepeat : THREE.LoopOnce;
      action.setLoop(loopMode, Infinity);
      action.clampWhenFinished = true;
      action.setEffectiveTimeScale(2.0);
      return [actionName, action];
    })
  );

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

  mixer.addEventListener('loop', playAction);
  mixer.addEventListener('finished', playAction);

  const scheduleStateChange = (stateChange: StateChange) => {
    // If multiple state change resulted in the same current action being scheduled, do nothing
    if (runningStateChange?.state == stateChange.state) {
      waitingStateChange = null;
      return;
    }

    waitingStateChange = stateChange;

    // Wait for running action to finish before playing the new one
    if (runningStateChange && actionsMap.get(runningStateChange.actionName)?.isRunning()) {
      return;
    }

    playAction();
  };

  interface StateChange {
    state: State;
    actionName: ActionName;
  }
  const stateChanges = {
    pointed: new Map<State, StateChange>([['idle', { state: 'pointed', actionName: 'LiftAction' }]]),
    notPointed: new Map<State, StateChange>([['pointed', { state: 'idle', actionName: 'UnliftAction' }]]),
    selected: new Map<State, StateChange>([
      ['idle', { state: 'selected', actionName: 'LiftOutAction' }],
      ['pointed', { state: 'selected', actionName: 'OutAction' }]
    ]),
    notSelected: new Map<State, StateChange>([['selected', { state: 'idle', actionName: 'InAction' }]])
  };

  const changeState = (stateChangeMap: Map<State, StateChange>) => {
    const stateChange = stateChangeMap.get(currentState);
    if (!stateChange) {
      return;
    }

    const { state } = stateChange;
    currentState = state;

    scheduleStateChange(stateChange);
  };

  const onPointedChange = (pointed: boolean) => {
    const stateChangeMap = stateChanges[pointed ? 'pointed' : 'notPointed'];
    changeState(stateChangeMap);
  };

  const onSelectedChange = (selected: boolean) => {
    const stateChangeMap = stateChanges[selected ? 'selected' : 'notSelected'];
    changeState(stateChangeMap);
  };

  $: onPointedChange(pointed);
  $: onSelectedChange(internalSelected);
</script>

<svelte:body class:cursor-pointed={pointed} />
