import type { PublicViewer } from '@s0rt/3d-viewer';
import { writable, type Writable } from 'svelte/store';

export const viewer: Writable<null | PublicViewer> = writable(null);