import type { ViewerState } from '$lib/state/State';
import { writable, type Writable } from 'svelte/store';

export const viewerState: Writable<ViewerState> = writable("mounting");