<script lang="ts">
	import { page } from '$app/stores';
	import { globalState } from '$lib/state/globalState.svelte';
	import {
		ChevronLeftCircleIcon,
		ChevronLeftIcon,
		ChevronRightCircleIcon,
		ChevronRightIcon,
		CircleXIcon,
		XIcon
	} from 'lucide-svelte';
	import NavigationButton from '../ui/NavigationButton.svelte';

	let pages = $derived($page.data['pages']);

	let pageIndex = $derived(globalState.currentPage ? globalState.currentPage.index : -1);

	const mod = (n: number, m: number) => ((n % m) + m) % m;

	let previousIndex = $derived(pageIndex > -1 ? mod(pageIndex - 1, pages.length) : -1);
	let nextIndex = $derived(pageIndex > -1 ? mod(pageIndex + 1, pages.length) : -1);

	let previousPage = $derived(pages[previousIndex] ?? null);
	let nextPage = $derived(pages[nextIndex] ?? null);
</script>

<nav class="pointer-events-none absolute h-full w-full">
	{#if previousPage}
		<NavigationButton
			href={previousPage.pathname}
			icon={ChevronLeftIcon}
			label={previousPage.label}
			class="bottom-4 left-4 lg:bottom-16 lg:left-16"
		></NavigationButton>
	{/if}
	<NavigationButton href="/" icon={XIcon} label={'home'} class="top-4 right-4 lg:top-16 lg:right-16"
	></NavigationButton>
	{#if nextPage}
		<NavigationButton
			href={nextPage.pathname}
			icon={ChevronRightIcon}
			label={nextPage.label}
			class="right-4 bottom-4 lg:right-16 lg:bottom-16"
		></NavigationButton>
	{/if}
</nav>
