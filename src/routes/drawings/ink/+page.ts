import type { PageLoad } from './$types';
import euphonium from './assets/euphonium.png';
import eye from './assets/eye.png';
import piano from './assets/piano.png';
import smoke from './assets/smoke.png';

export const load: PageLoad = () => {
  return {
    urls: [euphonium, eye, piano, smoke],
    texts: ['Euphonium', 'Canopy', 'Piano learning nightmares', 'Smoke in the water'],
    pageIndex: 0,
    title: 'Drawings from black ink'
  };
}