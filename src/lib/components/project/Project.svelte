<script lang="ts">
	import type { Snippet } from 'svelte';
	import ProjectPanel from './ProjectPanel.svelte';
	import Navigation from './Navigation.svelte';

	interface Props {
		title: string;
		githubLink?: string | null;
		link?: string | null;
		screenshots?: string[];
		project?: Snippet;
		about: Snippet;
		excerpt?: Snippet;
	}

	let {
		title,
		githubLink = null,
		link = null,
		screenshots = [],
		project,
		about,
		excerpt
	}: Props = $props();
</script>

<div class="pointer-events-none flex h-full w-full">
	<div class="horizontal:translate-x-[-15%] w-full overflow-y-hidden">
		{@render project?.()}
	</div>
	<div
		class="absolute top-0 flex h-full max-h-full w-full items-end justify-center overflow-y-hidden p-2 sm:p-4"
	>
		<ProjectPanel {title} {githubLink} {link} {screenshots}>
			{#snippet about()}
				{@render about()}
			{/snippet}
			{#snippet excerpt()}
				{@render excerpt?.()}
			{/snippet}
		</ProjectPanel>
	</div>
	<Navigation></Navigation>
</div>
