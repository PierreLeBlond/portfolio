import type { PageLoad } from './$types';
import euphonium from './assets/euphonium.png';
import eye from './assets/eye.png';
import piano from './assets/piano.png';
import smoke from './assets/smoke.png';
import { THREE } from '@s0rt/3d-viewer';

export const load: PageLoad = () => {
  return {
    urls: [euphonium, eye, piano, smoke],
    texts: ['Euphonium', 'Canopy', 'Piano learning nightmares', 'Smoke in the water'],
    dialog: 'Pure black ink',
    disolve: true,
    camera: {
      position: new THREE.Vector3(-0.740, 1.112, 1.012),
      target: new THREE.Vector3(-1.05, 1.112, 1.012)
    }
  };
}