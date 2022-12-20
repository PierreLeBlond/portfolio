import type { PageLoad } from './$types';
import bboy from './assets/bboy.svg';
import lalpine from './assets/lalpine.svg';
import lecorp from './assets/lecorp.svg';
import logophtalmo from './assets/logophtalmo.svg';

export const load: PageLoad = () => {
  return {
    urls: [bboy, lalpine, lecorp, logophtalmo],
    texts: ['Break dance & Earth lovers', 'L\'A(l)pine', 'A logo for a good friend evil corporation', 'A logo for an ophtalmology center'],
    pageIndex: 1,
    title: 'Logos for clients & friends'
  };
}