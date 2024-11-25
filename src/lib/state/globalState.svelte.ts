import type { PublicViewer, THREE } from "@s0rt/3d-viewer";

let publicViewer = $state<PublicViewer | null>(null);

export type CameraTarget = {
  target: THREE.Vector3;
  position: THREE.Vector3;
  controlMinDistance: number;
  yOffset: number;
};
let cameraTarget = $state<CameraTarget | null>(null);

export type Page = {
  index: number;
  objectName: string;
  pathname: string;
  label: string;
  description?: string;
  disolve: boolean;
};

let selectedPage = $state<Page | null>(null);
let pointedPage = $state<Page | null>(null);
let touchedPage = $state<Page | null>(null);
let currentPage = $state<Page | null>(null);

let selectedObject = $derived.by<THREE.Object3D | null>(() => {
  if (!publicViewer) {
    return null;
  }

  if (!currentPage) {
    return null;
  }

  return (
    publicViewer.viewer.scene.getObjectByName(currentPage.objectName) || null
  );
});

export const globalState = {
  get publicViewer(): PublicViewer | null {
    return publicViewer;
  },
  set publicViewer(value: PublicViewer | null) {
    publicViewer = value;
  },
  get selectedObject(): THREE.Object3D | null {
    return selectedObject;
  },
  get cameraTarget(): CameraTarget | null {
    return cameraTarget;
  },
  set cameraTarget(value: CameraTarget | null) {
    cameraTarget = value;
  },
  get selectedPage(): Page | null {
    return selectedPage;
  },
  set selectedPage(value: Page | null) {
    selectedPage = value;
  },
  get pointedPage(): Page | null {
    return pointedPage;
  },
  set pointedPage(value: Page | null) {
    pointedPage = value;
  },
  get touchedPage(): Page | null {
    return touchedPage;
  },
  set touchedPage(value: Page | null) {
    touchedPage = value;
  },
  get currentPage(): Page | null {
    return currentPage;
  },
  set currentPage(value: Page | null) {
    currentPage = value;
  },
};
