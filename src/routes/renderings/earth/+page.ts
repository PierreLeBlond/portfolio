import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    loadingJoke: 'Creating the earth, might take a few days...',
    title: 'Interactive 3d earth globe'
  };
}