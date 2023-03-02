import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	assetsInclude: ['**/*.dds', '**/*.glb', '**/*.gltf']
};

export default config;
