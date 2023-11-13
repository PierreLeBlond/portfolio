import type { Scene } from "@s0rt/3d-viewer";
import { tweened, type Tweened } from "svelte/motion";
import { disolveObject } from "./disolve/disolveObject";

export const configureObjects = (
  scene: Scene,
  pages: {
    objectName: string;
    pathname: string;
    isExternal: boolean;
    disolve: boolean;
  }[],
): Map<string, THREE.Object3D> => {
  const map = new Map<string, THREE.Object3D>();

  pages.forEach(({ objectName, pathname, isExternal, disolve }) => {
    const object = scene.getObjectByName(objectName);

    if (!object) {
      throw new Error(`Couldn't find object ${objectName}`);
    }

    if (object.type == "SkinnedMesh") {
      object.frustumCulled = false;
    }

    object.userData["pathname"] = pathname;
    object.userData["isExternal"] = isExternal;

    if (disolve) {
      const disolveRatio: Tweened<number> = tweened(1, { duration: 500 });
      object.userData["disolveRatio"] = disolveRatio;

      disolveRatio.subscribe((ratio) => {
        disolveObject(object, ratio);
      });
    }

    const colliderName = `${objectName}Collider`;
    const collider = scene.getObjectByName(colliderName);

    if (!collider) {
      throw new Error(`Couldn't find object collider ${colliderName}`);
    }

    collider.userData["isCollider"] = true;
    collider.visible = false;

    object.userData["collider"] = collider;
    collider.userData["object"] = object;

    map.set(pathname, object);
  });

  return map;
};
