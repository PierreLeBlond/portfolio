import type { Page } from '$lib/state/globalState.svelte';
import {
	CHESS_LABEL,
	EARTH_LABEL,
	INK_LABEL,
	LOGO_LABEL,
	QUESTS_LABEL,
	RECIPE_LABEL,
	TEAMUP_LABEL,
	USTOM_LABEL,
	WAVE_LABEL
} from '../constants';
import type { LayoutLoad } from './$types';
import irradiance from './assets/room_rgbd_irradiance.dds?url';
import radiance from './assets/room_rgbd_radiance.dds?url';

export const load: LayoutLoad = () => {
	const pages: Page[] = [
		{
			index: 0,
			objectName: 'InkCube',
			pathname: '/projects/drawings/ink',
			label: INK_LABEL,
			disolve: true
		},
		{
			index: 1,
			objectName: 'LogoCube',
			pathname: '/projects/drawings/logo',
			label: LOGO_LABEL,
			disolve: true
		},
		{
			index: 2,
			objectName: 'Earth',
			pathname: '/projects/renderings/earth',
			label: EARTH_LABEL,
			disolve: true
		},
		{
			index: 3,
			objectName: 'Wave',
			pathname: '/projects/apps/wave',
			label: WAVE_LABEL,
			disolve: false
		},
		{
			index: 4,
			objectName: 'Teamup',
			pathname: '/projects/apps/teamup',
			label: TEAMUP_LABEL,
			disolve: false
		},
		{
			index: 5,
			objectName: 'Ustom',
			pathname: '/projects/apps/ustom',
			label: USTOM_LABEL,
			disolve: false
		},
		{
			index: 6,
			objectName: 'Quests',
			pathname: '/projects/apps/quests',
			label: QUESTS_LABEL,
			disolve: false
		},
		{
			index: 7,
			objectName: 'Recipe',
			pathname: '/projects/apps/recipe',
			label: RECIPE_LABEL,
			disolve: false
		},
		{
			index: 8,
			objectName: 'Chess',
			pathname: '/projects/renderings/chess',
			label: CHESS_LABEL,
			disolve: true
		}
	];
	return {
		pages,
		irradiance,
		radiance,
		controlMinDistance: 0
	};
};
