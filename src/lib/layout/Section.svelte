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
			<Pictogram class="picto {layout}" width="min(100%, 250px)" height="auto" />
		{/if}
	</div>
</section>

<style>
	.content {
		grid-area: content;
	}

	.illustration {
		grid-area: illustration;
		padding-top: 2rem;
		display: grid;
		place-items: center;
	}

	section {
		display: grid;
		gap: 1rem;

		&.left {
			grid-template-columns: 1fr 2fr;
			grid-template-areas: 'illustration content';
		}

		&.right {
			grid-template-columns: 2fr 1fr;
			grid-template-areas: 'content illustration';
		}
	}

	@media (max-width: 700px) {
		section {
			display: flex;
			flex-flow: column;
			align-items: center;
			position: relative;
		}

		.illustration {
			position: absolute;
			top: 0;
			z-index: -1;
			opacity: 0.2 !important;
		}

		.left .illustration {
			left: 0;
		}

		.right .illustration {
			right: 0;
		}
	}
</style>
