import { THREE } from '@s0rt/3d-viewer';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    camera: {
      position: new THREE.Vector3(3.75, 3.75, 4.5),
      target: new THREE.Vector3(0, 0.75, 0),
    },
    controlMinDistance: 3.5,
    dialog: 'Feel free to explore !',
    isHome: true
  };
}