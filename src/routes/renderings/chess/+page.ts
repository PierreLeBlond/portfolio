import type { PageLoad } from './$types';
import { THREE } from '@s0rt/3d-viewer';

export const load: PageLoad = () => {
  return {
    dialog: 'Yeah I know, you can\'t play with it yet, sorry.',
    camera: {
      position: new THREE.Vector3(1, 1.1, 0.5),
      target: new THREE.Vector3(0.375, 0.972, 0)
    }
  };
}