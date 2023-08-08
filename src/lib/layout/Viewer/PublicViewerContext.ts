import type { PublicViewer } from "@s0rt/3d-viewer"

export type PublicViewerContext = {
  getPublicViewer: () => Promise<PublicViewer>,
  getPublicViewerSync: () => PublicViewer
}