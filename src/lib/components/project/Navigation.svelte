<script lang="ts">
	import { page } from '$app/stores';
	import { globalState } from '$lib/state/globalState.svelte';
	import {
		ArrowBigLeft,
		ArrowBigRight,
		Box,
		ChevronLeftIcon,
		ChevronRightIcon,
		DoorOpenIcon,
		HelpCircle
	} from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	type Props = {
		open: boolean;
	};

	let { open = $bindable() }: Props = $props();

	let pages = $derived($page.data['pages']);

	let pageIndex = $derived(globalState.currentPage ? globalState.currentPage.index : -1);

	const mod = (n: number, m: number) => ((n % m) + m) % m;

	let previousIndex = $derived(pageIndex > -1 ? mod(pageIndex - 1, pages.length) : -1);
	let nextIndex = $derived(pageIndex > -1 ? mod(pageIndex + 1, pages.length) : -1);

	let previousPage = $derived(pages[previousIndex] ?? null);
	let nextPage = $derived(pages[nextIndex] ?? null);

	let previousHovered = $state(false);
	let nextHovered = $state(false);
	let homeHovered = $state(false);
</script>

<nav
	class="horizontal:p-4 horizontal:grid-cols-3 horizontal:h-20 pointer-events-none grid h-12 grid-cols-4"
>
	{#if previousPage}
		<a
			href={previousPage.pathname}
			class="pointer-events-auto relative flex items-center justify-center justify-self-start p-2"
			onpointerenter={() => (previousHovered = true)}
			onpointerleave={() => (previousHovered = false)}
		>
			<ChevronLeftIcon size={32} strokeWidth={2} absoluteStrokeWidth></ChevronLeftIcon>
			{#if previousHovered}
				<p
					class="absolute right-0 translate-x-full rounded-md bg-stone-200 px-2 py-1 text-nowrap shadow-sm"
					transition:fly|global={{ x: -20, delay: 1 }}
				>
					{previousPage.label}
				</p>
			{/if}
		</a>
	{/if}

	<button
		type="button"
		class="horizontal:hidden pointer-events-auto flex items-center justify-center p-2"
		onclick={() => (open = !open)}
	>
		<HelpCircle
			size={32}
			strokeWidth={2}
			absoluteStrokeWidth
			class={`transition-transform ${open ? 'rotate-180' : ''}`}
		></HelpCircle>
	</button>
	<a
		href="/"
		class="pointer-events-auto relative flex items-center justify-center p-2"
		onpointerenter={() => (homeHovered = true)}
		onpointerleave={() => (homeHovered = false)}
	>
		<DoorOpenIcon size={32} strokeWidth={2} absoluteStrokeWidth></DoorOpenIcon>
		{#if homeHovered}
			<p
				class="absolute top-0 -translate-y-full rounded-md bg-stone-200 px-2 py-1 text-nowrap shadow-sm"
				transition:fly|global={{ y: 20, delay: 1 }}
			>
				home
			</p>
		{/if}
	</a>
	{#if nextPage}
		<a
			href={nextPage.pathname}
			class="pointer-events-auto relative flex items-center justify-center justify-self-end p-2"
			onpointerenter={() => (nextHovered = true)}
			onpointerleave={() => (nextHovered = false)}
		>
			<ChevronRightIcon size={32} strokeWidth={2} absoluteStrokeWidth></ChevronRightIcon>
			{#if nextHovered}
				<p
					class="absolute left-0 -translate-x-full rounded-md bg-stone-200 px-2 py-1 text-nowrap shadow-sm"
					transition:fly|global={{ x: 20, delay: 1 }}
				>
					{nextPage.label}
				</p>
			{/if}
		</a>
	{/if}
</nav>
