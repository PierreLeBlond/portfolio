<script lang="ts">
	import type { Snippet } from 'svelte';
	import ProjectPanel from './ProjectPanel.svelte';

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

<div class="pointer-events-none relative flex h-full w-full">
	<div class="horizontal:w-3/5 w-full overflow-hidden">
		{@render project?.()}
	</div>
	<div
		class="horizontal:relative horizontal:w-2/5 horizontal:pr-8 horizontal:items-center horizontal:justify-start horizontal:p-0 horizontal:py-4 absolute top-0 flex h-full max-h-full w-full items-end justify-center overflow-hidden p-2 sm:p-4"
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
</div>
