import type { PageState } from '$lib/state/State';
import { writable, type Writable } from 'svelte/store';

export const pageState: Writable<PageState> = writable("ready");