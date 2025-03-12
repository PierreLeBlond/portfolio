<script lang="ts">
	import { scale } from 'svelte/transition';
	import { type Icon as IconType } from 'lucide-svelte';
	import { cn } from '../utils';

	const RADIUS = 32;

	type Props = {
		href?: string;
		icon: typeof IconType;
		label: string;
		highlighted?: boolean;
		onclick?: () => void;
		class?: string;
	};

	let { href, icon: Icon, label, highlighted = false, class: className, onclick }: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role={href ? 'link' : undefined}
	transition:scale|global
	{href}
	class={cn(
		'group hover:bg-background/80 pointer-events-auto absolute bottom-4 flex size-16 items-center justify-center rounded-full bg-white/50 p-2 shadow-lg backdrop-blur-md transition-colors lg:size-32',
		highlighted && 'bg-background/80',
		className
	)}
	{onclick}
>
	<div class="flex size-full items-center justify-center lg:size-20">
		<Icon class="lg:size-12 lg:stroke-1"></Icon>
	</div>
	<svg
		class={cn(
			'absolute inset-0 transition-transform duration-500 group-hover:rotate-180',
			highlighted && 'rotate-180'
		)}
		viewBox="0 0 100 100"
	>
		<path
			d={`m${50 - RADIUS},50 a${RADIUS},${RADIUS} 0 0 1 ${2 * RADIUS},0}`}
			id="path"
			class="opacity-0"
		/>
		<path
			d={`m${50 + RADIUS},50 a${RADIUS},${RADIUS} 0 0 1 ${-2 * RADIUS},0}`}
			id="bottom-path"
			class="opacity-0"
		/>
		<text
			><textPath
				xlink:href="#path"
				startOffset="50%"
				text-anchor="middle"
				class={cn(
					'fill-foreground group-hover:fill-foreground/50 transition-colors',
					highlighted && 'fill-foreground/50'
				)}
			>
				{label}
			</textPath>
			<textPath
				xlink:href="#bottom-path"
				startOffset="50%"
				text-anchor="middle"
				class={cn(
					'fill-foreground/50 group-hover:fill-foreground transition-colors',
					highlighted && 'fill-foreground'
				)}
			>
				{label}
			</textPath></text
		>
	</svg>
</svelte:element>
