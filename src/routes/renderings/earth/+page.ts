import type { PageLoad } from './$types';
import { THREE } from '@s0rt/3d-viewer';

export const load: PageLoad = () => {
  return {
    dialog: 'That\'s a lot of countries.',
    disolve: true,
    camera: {
      position: new THREE.Vector3(-1.065, 2.07, -0.305),
      target: new THREE.Vector3(-1.24, 2.02, -0.64)
    }
  };
}