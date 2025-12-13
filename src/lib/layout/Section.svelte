<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		Pictogram = undefined,
		layout = 'right',
		children
	} = $props<{
		Pictogram?: any;
		layout?: 'left' | 'right';
		children: Snippet;
	}>();
</script>

<section class={layout}>
	<div class="content">
		{@render children()}
	</div>
	<div class="illustration">
		{#if Pictogram}
			<Pictogram class="picto {layout}" />
		{/if}
	</div>
</section>

<style>
	:root {
		--illustration-ratio: 2fr;
		@media print {
			--illustration-ratio: 3fr;
		}
	}

	.content {
		grid-area: content;
		position: relative;
		z-index: 1;
	}

	.illustration {
		grid-area: illustration;
		padding-top: 2rem;
		display: grid;
		place-items: center;
	}

	section {
		display: flex;
		flex-flow: column;
		align-items: center;
		position: relative;
		isolation: isolate;
	}

	.illustration {
		position: absolute;
		top: 0;
		z-index: 0;
		opacity: 0.3 !important;
	}

	.illustration :global(svg) {
		width: min(100%, 350px);
		height: auto;
	}

	.left .illustration {
		left: 0;
	}

	.right .illustration {
		right: 0;
	}
</style>
