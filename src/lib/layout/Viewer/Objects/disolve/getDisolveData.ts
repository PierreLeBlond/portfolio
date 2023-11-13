import { THREE } from "@s0rt/3d-viewer";

const wireframeMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xfb923c,
});

export const getDisolveData = (object: THREE.Object3D) => {
  const meshDatas: {
    mesh: THREE.Mesh;
    wireframeMesh: THREE.Mesh;
    faceCount: number;
  }[] = [];

  object.traverse((children: THREE.Object3D) => {
    if (children.type != "Mesh" && children.type != "SkinnedMesh") {
      return;
    }

    if (children.userData["isDisolveWireframe"]) {
      return;
    }

    const mesh = children as THREE.Mesh;

    let meshData = mesh.userData["disolveData"];
    if (meshData) {
      meshDatas.push(meshData);
      return;
    }

    const wireframeMesh = new THREE.Mesh();
    wireframeMesh.name = `${mesh.name}_wireframe`;

    wireframeMesh.geometry = new THREE.BufferGeometry();
    wireframeMesh.geometry.copy(mesh.geometry);

    wireframeMesh.material = wireframeMaterial;

    const meshIndexBuffer = mesh.geometry.getIndex();

    if (!meshIndexBuffer) {
      throw new Error("Mesh should be indexed to be disolved.");
    }

    const faceCount = meshIndexBuffer.count / 3;

    meshData = {
      mesh,
      wireframeMesh,
      faceCount,
    };

    wireframeMesh.userData["isDisolveWireframe"] = true;
    mesh.userData["disolveData"] = meshData;

    meshDatas.push(meshData);
  });

  meshDatas.forEach(({ mesh, wireframeMesh }) => {
    const alreadySetChildren = mesh.getObjectByName(`${mesh.name}_wireframe`);
    if (alreadySetChildren) {
      return;
    }

    mesh.add(wireframeMesh);
  });

  return meshDatas;
};
