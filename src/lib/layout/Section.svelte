<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		pictogram = undefined,
		large = false,
		layout = 'right',
		children
	} = $props<{
		pictogram?: any 
		large?: boolean
		layout?: 'left' | 'right',
		children: Snippet
	}>()

	const classes = `${large ? 'large' : ''} ${layout}`;
</script>

<section class={classes}>
	<div class="content">
		{@render children()}
	</div>
	<div class="illustration">
		{#if pictogram}
			<svelte:component this={pictogram} class="picto {classes}" />
		{/if}
	</div>
</section>

<style>
	:root {
		--section-normal-width: 200px;
		--section-large-width: 250px;
	}

	.illustration {
		grid-area: illustration;
	}

	.content {
		grid-area: content;
	}

	section {
		display: grid;
		gap: 1rem;
	}

	section.left {
		grid-template-columns: var(--section-normal-width) 1fr;
		grid-template-areas: 'illustration content';
	}
	section.left.large {
		grid-template-columns: var(--section-large-width) 1fr;
	}

	section.right {
		grid-template-columns: 1fr var(--section-normal-width);
		grid-template-areas: 'content illustration';
	}
	section.right.large {
		grid-template-columns: 1fr var(--section-large-width);
	}

	section :global(svg.picto) {
		max-width: 100%;
		width: var(--section-normal-width);
		height: auto;
		margin-top: 2.5rem;
	}

	section :global(svg.large) {
		width: var(--section-large-width);
		height: auto;
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
