import type { PageLoad } from './$types';
import { THREE } from '@s0rt/3d-viewer';

export const load: PageLoad = () => {
  return {
    dialog: 'The wave monster collapse algorythm ?',
    camera: {
      position: new THREE.Vector3(-0.037207, 2.0632, -1.0),
      target: new THREE.Vector3(-0.037207, 2.0632, -1.348)
    }
  };
}