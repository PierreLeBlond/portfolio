import { getDisolveData } from "./getDisolveData";

const RATIO_DELAY = 0.3;

export const disolveObject = (object: THREE.Object3D, disolveRatio: number) => {
  const meshDatas = getDisolveData(object);

  const wireframeScale = Math.min(1, (RATIO_DELAY + 1) * (1.0 - disolveRatio));
  const hiddenScale = Math.max(
    0,
    (1.0 - disolveRatio) * (1 + RATIO_DELAY) - RATIO_DELAY,
  );

  meshDatas.forEach(({ mesh, wireframeMesh, faceCount }) => {
    const faceIndex = Math.trunc(wireframeScale * faceCount);
    const hiddenFaceIndex = Math.trunc(hiddenScale * faceCount);
    mesh.geometry.setDrawRange(faceIndex * 3, (faceCount - faceIndex) * 3);
    wireframeMesh.geometry.setDrawRange(
      hiddenFaceIndex * 3,
      (faceIndex - hiddenFaceIndex) * 3,
    );
  });
};
