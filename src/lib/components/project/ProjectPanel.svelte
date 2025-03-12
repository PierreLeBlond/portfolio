<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import About from './About.svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '../utils';
	import { MessageCircleIcon } from 'lucide-svelte';
	import NavigationButton from '../ui/NavigationButton.svelte';

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

{#snippet card()}
	<div
		class="relative flex max-h-full w-full flex-col rounded-lg bg-white/50 shadow-sm backdrop-blur-xl"
		transition:fly|global={{ duration: 300, y: 60, delay: 1 }}
	>
		<About {title} {githubLink} {link} {screenshots} scrollKey="horizontal">{@render about()}</About
		>
	</div>
{/snippet}

<section class="relative h-full w-full">
	{#if !open}
		<div
			class="horizontal:hidden absolute bottom-0 left-1/2 w-full -translate-x-1/2 px-4 pt-2 pb-24 text-center empty:hidden lg:pb-16"
			transition:fly|global={{ duration: 300, y: 20, delay: 1 }}
		>
			{@render excerpt?.()}
		</div>
	{:else}
		<div
			class="horizontal:hidden absolute bottom-0 left-1/2 flex h-full w-full max-w-[40rem] -translate-x-1/2 items-end pb-24"
		>
			{@render card()}
		</div>
	{/if}

	<div
		class="horizontal:flex absolute top-1/2 left-1/2 ml-32 hidden h-full max-w-96 -translate-y-1/2 items-center"
		transition:scale|global={{ duration: 400, delay: 1 }}
	>
		{@render card()}
	</div>
</section>

<NavigationButton
	icon={MessageCircleIcon}
	label="Info"
	onclick={() => (open = !open)}
	highlighted={open}
	class="horizontal:hidden right-1/2 bottom-4 flex translate-x-1/2 lg:right-16 lg:bottom-1/2 lg:translate-x-0 lg:translate-y-1/2"
></NavigationButton>
