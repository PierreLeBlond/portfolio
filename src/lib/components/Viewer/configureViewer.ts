import * as VIEWER from "@s0rt/3d-viewer";
import { VERTICAL_RATIO_LIMIT } from "../../../constants";
import room from "./assets/room.gltf?url";
import { configureCamera } from "./configureCamera";
import { configureViewOffset } from "./configureScreenOffset";

export const configureViewer = async () => {
  // Page scenes require viewer lib as a external dependency
  window.VIEWER = VIEWER;

  const publicViewer = new VIEWER.PublicViewer("viewer");

  const scene = publicViewer.viewer.createScene("room");
  publicViewer.viewer.setScene(scene);
  await scene.loadAsset(room, "/public/");

  publicViewer.viewer.fov = 50;
  publicViewer.viewer.verticalRatio = VERTICAL_RATIO_LIMIT;
  configureCamera(publicViewer.viewer.camera, publicViewer.viewer.controls);

  configureViewOffset(publicViewer);

  return publicViewer;
};
