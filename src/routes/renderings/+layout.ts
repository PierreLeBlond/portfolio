import type { LayoutLoad } from './$types';
import irradiance from './assets/gray_rgbd_irradiance.dds';
import radiance from './assets/gray_rgbd_radiance.dds';

export const load: LayoutLoad = () => {
  return {
    irradiance,
    radiance
  };
}