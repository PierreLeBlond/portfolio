import type { GlobalState } from '$lib/state/State';
import { writable, type Writable } from 'svelte/store';

export const globalState: Writable<GlobalState> = writable("mounting");