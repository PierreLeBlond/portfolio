<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<section
	class="horizontal:h-full horizontal:w-1/2 horizontal:flex-col horizontal:items-start horizontal:justify-center horizontal:p-16 pointer-events-none absolute right-0 bottom-0 flex h-screen w-full flex-col justify-between gap-y-4 p-6 text-stone-100"
	transition:fly|global={{ x: 500, delay: 1 }}
>
	<div class="flex flex-col gap-y-4">
		<p>
			<span class="font-title ont-bold text-3xl sm:text-5xl">Pierre Lespingal</span> <br />
			<span class="font-title text-2xl font-bold text-stone-300 sm:text-3xl">
				3D & Web developer</span
			>
		</p>
	</div>
	<p class="horizontal:text-start pointer-events-none justify-self-end text-start text-lg">
		Looking for job opportunities!<br />
		Feel free to contact me at
		<a href="mailto:pierre.lespingal@gmail.com" class="pointer-events-auto text-sky-500">
			pierre.lespingal@gmail.com
		</a>
	</p>
</section>
