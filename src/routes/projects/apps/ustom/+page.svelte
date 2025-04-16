<script lang="ts">
	import { fade } from 'svelte/transition';
	import Mask from '$lib/content/app/Mask.svelte';
	import Project from '$lib/components/project/Project.svelte';
	import RatioBox from '$lib/components/ui/RatioBox.svelte';
	import { USTOM_LABEL, VERTICAL_RATIO_LIMIT } from '../../../../constants';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getAppContext } from '$lib/context/appContext';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let app = getAppContext();

	// Avoid revealing the iframe before it's fully loaded
	let unmask = $state(false);

	onMount(async () => {
		app.trigger('load');
	});

	const handleLoaded = () => {
		app.trigger('loaded');
		unmask = true;
	};
</script>

<Project
	title={USTOM_LABEL}
	githubLink="https://github.com/PierreLeBlond/ustom"
	link="https://app.pierrelespingal.xyz/ustom/?encryptedWord=158ae1b0d188&iv=a62f76eb217e47f158688e579c00209b"
	screenshots={data.screenshots}
>
	{#snippet project()}
		<div
			class="pointer-events-auto relative h-full w-full"
			out:fade|global={{
				duration: 1 /* Hide immediatly on page navigation, regardless of other transition deleying component destroy */
			}}
		>
			<Mask columns={6} frames={30} loaded={unmask}>
				<RatioBox ratio={VERTICAL_RATIO_LIMIT}>
					<div class="h-full w-full scale-90">
						<iframe
							onload={handleLoaded}
							title="ustom"
							src="https://app.pierrelespingal.xyz/ustom/?encryptedWord=158ae1b0d188&iv=a62f76eb217e47f158688e579c00209b"
							class="bg-foreground h-full w-full rounded-lg"
						></iframe>
					</div>
				</RatioBox>
			</Mask>
		</div>
	{/snippet}

	{#snippet about()}
		<div class="flex flex-col">
			{#if app.state === 'idle'}
				<p>
					It's a clone of wordle. It has a leaderboard, and you can create your own game. It is also
					made with <b>svelte</b>, neat.
				</p>
			{:else}
				<p>Thinking of a word...</p>
			{/if}
		</div>
	{/snippet}
</Project>
