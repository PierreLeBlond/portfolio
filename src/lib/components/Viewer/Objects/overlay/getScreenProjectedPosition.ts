import { THREE } from "@s0rt/3d-viewer";

export const getScreenProjectedPosition = (
  position: THREE.Vector3,
  projectionMatrix: THREE.Matrix4,
  viewMatrix: THREE.Matrix4,
  viewport: { width: number; height: number },
): { x: number; y: number } => {
  const vector4 = new THREE.Vector4(position.x, position.y, position.z, 1);
  vector4.applyMatrix4(viewMatrix);
  vector4.applyMatrix4(projectionMatrix);

  vector4.x /= vector4.w;
  vector4.y /= vector4.w;

  vector4.x = (vector4.x + 1) * 0.5;
  vector4.y = -(vector4.y - 1) * 0.5;

  vector4.x *= viewport.width;
  vector4.y *= viewport.height;
  return {
    x: vector4.x,
    y: vector4.y,
  };
};
