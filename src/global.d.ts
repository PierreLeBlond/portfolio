declare module "**/*.dds" {
  const content: any;
  export default content;
}

declare module "**/*.glb" {
  const content: any;
  export default content;
}

declare module "**/*.gltf" {
  const content: any;
  export default content;
}

export declare global {
  import type ViewerInterface from '@s0rt/3d-viewer';
  interface Window {
    VIEWER: ViewerInterface
  }
}