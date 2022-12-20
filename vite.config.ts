import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	optimizeDeps: {
		exclude: ['@s0rt/3d-viewer', '@s0rt/wave-monster-collapse']
	},
	plugins: [sveltekit()],
	assetsInclude: ['**/*.dds']
};

export default config;
