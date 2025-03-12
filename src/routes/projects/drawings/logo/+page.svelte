<script lang="ts">
	import { page } from '$app/stores';
	import Project from '$lib/components/project/Project.svelte';
	import RatioBox from '$lib/components/ui/RatioBox.svelte';
	import CubeViewer from '$lib/content/drawings/CubeViewer.svelte';
	import { fade } from 'svelte/transition';
	import { LOGO_LABEL, VERTICAL_RATIO_LIMIT } from '../../../../constants';
	import { getAppContext } from '$lib/context/appContext';
	import { globalState } from '$lib/state/globalState.svelte';
	import { useDisolve } from '$lib/hooks/useDisolve.svelte';
	import { onDestroy } from 'svelte';

	const app = getAppContext();

	const { disolve, resolve } = useDisolve(app.trigger, globalState.selectedObject);

	let urls = $derived($page.data['urls'] || []);
	let texts = $derived($page.data['texts'] || []);

	let text: string | null = $state(null);

	onDestroy(() => {
		resolve();
	});
</script>

<Project title={LOGO_LABEL}>
	{#snippet project()}
		{#await disolve() then}
			<div class="pointer-events-auto relative h-full w-full">
				<RatioBox ratio={VERTICAL_RATIO_LIMIT}>
					<div class="h-[90%]">
						<CubeViewer {urls} {texts} bind:text />
					</div>
				</RatioBox>
			</div>
		{/await}
	{/snippet}

	{#snippet about()}
		<div class="flex w-full flex-col">
			<p>
				Another cube. It also rotates if you drag it. Though, the inscription on it looks like they
				were made numerically. Without doubt with open source software such as Inkscape, Gimp or
				Krita.
			</p>
			<p>
				This one seems to represent {#key text}
					<b in:fade={{ delay: 1 }}>
						{text}
					</b>
				{/key}.
			</p>
		</div>
	{/snippet}
	{#snippet excerpt()}
		<div>
			<p class="flex justify-center">
				{#key text}
					<b in:fade={{ delay: 1 }}>
						{text}
					</b>
				{/key}
			</p>
		</div>
	{/snippet}
</Project>
