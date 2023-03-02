import type { Scene } from "@s0rt/3d-viewer";

export const configureObjects = (scene: Scene, pages: { objectName: string, pathname: string }[]) => {

  pages.forEach(({ objectName, pathname, isExternal }) => {

    const object = scene.getObjectByName(objectName);

    if (!object) {
      throw new Error(`Couldn't find object ${objectName}`);
    }

    if (object.type == 'SkinnedMesh') {
      object.frustumCulled = false;
    }

    object.userData['pathname'] = pathname;
    object.userData['isExternal'] = isExternal;

    const colliderName = `${objectName}Collider`;
    const collider = scene.getObjectByName(colliderName);

    if (!collider) {
      throw new Error(`Couldn't find object collider ${colliderName}`);
    }

    collider.userData['isCollider'] = true;
    collider.visible = false;

    object.userData['collider'] = collider;
    collider.userData['object'] = object;

  });
}