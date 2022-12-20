import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    loadingJoke: 'Thinking about my next move...',
    title: 'Chess board rendering'
  };
}