import type { LayoutLoad } from './$types';
import irradiance from './assets/portfolio-room_rgbd_irradiance.dds';
import radiance from './assets/portfolio-room_rgbd_radiance.dds';

export const load: LayoutLoad = () => {
  return {
    pages: [{
      objectName: 'InkCube',
      pathname: '/drawings/ink',
      label: 'I like to draw'
    }, {
      objectName: 'LogoCube',
      pathname: '/drawings/logo',
      label: 'I found myself designing logos a few time'
    }, {
      objectName: 'Earth',
      pathname: '/renderings/earth',
      label: 'I made a basic interactive earth render'
    }, {
      objectName: 'Wave',
      pathname: '/experiments/wave',
      label: 'I played with the wave function collapse algorythm'
    }, {
      objectName: 'Chess',
      pathname: '/renderings/chess',
      label: 'I have a chessboard render'
    }, {
      objectName: 'Github',
      pathname: 'https://github.com/PierreLeBlond',
      label: 'My github page!',
      isExternal: true
    }, {
      objectName: 'At',
      pathname: 'mailto:pierre.lespingal@gmail.com',
      label: 'You can contact me at pierre.lespingal@gmail.com',
      isExternal: true
    }],
    irradiance,
    radiance,
    controlMinDistance: 0,
  };
}