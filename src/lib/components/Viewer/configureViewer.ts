import * as VIEWER from "@s0rt/3d-viewer";
import room from "./assets/room.gltf?url";
import { configureCamera } from "./configureCamera";

export const configureViewer = async () => {
  // page scenes require viewer lib as a external dependency
  window.VIEWER = VIEWER;

  const publicViewer = new VIEWER.PublicViewer("viewer");

  await publicViewer.launch();

  const scene = publicViewer.viewer.createScene("room");
  publicViewer.viewer.setScene(scene);
  await scene.loadAsset(room, "/public/");

  publicViewer.viewer.fov = 50;
  configureCamera(
    scene,
    publicViewer.viewer.camera,
    publicViewer.viewer.controls,
  );

  return publicViewer;
};
