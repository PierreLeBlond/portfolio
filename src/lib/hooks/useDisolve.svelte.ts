import type { THREE } from "@s0rt/3d-viewer";
import type { Tweened } from "svelte/motion";
import type { AppEvent } from "./useStateMachine.svelte";

export const useDisolve = (
  trigger: (event: AppEvent) => void,
  object: THREE.Object3D | null,
) => {
  const disolve = async () => {
    if (!object) {
      return;
    }
    const disolveRatio: Tweened<number> = object.userData["disolveRatio"];

    await disolveRatio.set(0);
    trigger("disolved");
  };

  const resolve = async () => {
    if (!object) {
      return;
    }
    const disolveRatio: Tweened<number> = object.userData["disolveRatio"];

    await disolveRatio.set(1);
  };

  return {
    disolve,
    resolve,
  };
};
