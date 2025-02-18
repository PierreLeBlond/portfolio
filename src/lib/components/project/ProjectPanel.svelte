<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import About from './About.svelte';
	import Navigation from './Navigation.svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '../utils';

	interface Props {
		title: string;
		githubLink: string | null;
		link: string | null;
		screenshots: string[];
		about: Snippet;
		excerpt?: Snippet;
	}

	let { title, githubLink, link, screenshots, about, excerpt }: Props = $props();

	let open = $state(false);
</script>

<section
	class={cn(
		'horizontal:max-w-96 relative flex max-h-full w-full max-w-[40rem] flex-col justify-between rounded-lg bg-stone-100/50 shadow-sm backdrop-blur-xl transition-all'
	)}
	transition:scale|global={{ duration: 400, delay: 1 }}
>
	<div
		class={cn(
			'grid overflow-hidden transition-all',
			open ? 'grid-rows-[1fr]' : 'horizontal:grid-rows-[1fr] grid-rows-[0fr]'
		)}
	>
		<About {title} {githubLink} {link} {screenshots} scrollKey="horizontal">{@render about()}</About
		>
	</div>
	{#if !open}
		<div
			class="horizontal:hidden absolute bottom-0 left-1/2 w-full -translate-x-1/2 px-4 pt-2 pb-16 text-center empty:hidden"
			transition:fly|global={{ duration: 300, y: 20, delay: 1 }}
		>
			{@render excerpt?.()}
		</div>
	{/if}
	<Navigation bind:open></Navigation>
</section>
