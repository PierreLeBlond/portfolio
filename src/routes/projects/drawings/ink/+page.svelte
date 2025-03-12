<script lang="ts">
	import { page } from '$app/stores';
	import CubeViewer from '$lib/content/drawings/CubeViewer.svelte';
	import { fade } from 'svelte/transition';
	import Project from '$lib/components/project/Project.svelte';
	import RatioBox from '$lib/components/ui/RatioBox.svelte';
	import { INK_LABEL, VERTICAL_RATIO_LIMIT } from '../../../../constants';
	import { getAppContext } from '$lib/context/appContext';
	import { useDisolve } from '$lib/hooks/useDisolve.svelte';
	import { onDestroy } from 'svelte';
	import { globalState } from '$lib/state/globalState.svelte';

	const app = getAppContext();

	const { disolve, resolve } = useDisolve(app.trigger, globalState.selectedObject);

	let urls = $derived($page.data['urls'] || []);
	let texts = $derived($page.data['texts'] || []);

	let text: string | null = $state(null);

	onDestroy(() => {
		resolve();
	});
</script>

<Project title={INK_LABEL}>
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
				A cube that rotate if you drag it. On each face there is a drawing, probably made with black
				ink. After further investigation, you found out that the cube is made with <b>css</b>.
			</p>
			<p>
				You inexpicably want to title that drawing {#key text}<b in:fade={{ delay: 1 }}>"{text}"</b
					>{/key}.
			</p>
		</div>
	{/snippet}
	{#snippet excerpt()}
		<div>
			<p class="flex justify-center">
				{#key text}<b in:fade={{ delay: 1 }}>{text}</b>{/key}
			</p>
		</div>
	{/snippet}
</Project>
