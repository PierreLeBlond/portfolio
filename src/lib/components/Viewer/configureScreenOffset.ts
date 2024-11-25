import { globalState } from "$lib/state/globalState.svelte";
import type { PublicViewer } from "@s0rt/3d-viewer";

export const configureViewOffset = (publicViewer: PublicViewer) => {
  // It should offset the rendering within the screen depending on it's ratio
  publicViewer.viewer
    .getEventDispatcher()
    .addEventListener("resize", ({ width, height }) => {
      const isHorizontal = width / height > 16 / 9;

      // This value should centers the rendering within the left item of a 3-2 grid
      const xOffset = isHorizontal ? -0.4 : 0;

      const yOffset = isHorizontal ? 0 : globalState.cameraTarget!.yOffset;

      publicViewer.viewer.camera.xOffset = xOffset;
      publicViewer.viewer.camera.yOffset = yOffset;
      publicViewer.viewer.camera.updateProjectionMatrix();
    });
};
