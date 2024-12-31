<script lang="ts">
	import { Editor } from '$lib/editor/core';
	import {
		CorePlugin,
		LinkPlugin,
		DragonPlugin,
		HistoryPlugin,
		RichTextPlugin
	} from '$lib/editor/plugins';
	import { TypeTheme, LinkTheme, BasicToolTheme } from '$lib/editor/themes';

	let layout: 'modern' | 'classic' = $state('modern');
</script>

<main>
	{#key layout}
		<Editor config={{ layout }} debug>
			<!--plugins-->
			<CorePlugin />
			<RichTextPlugin />
			<HistoryPlugin />
			<DragonPlugin />
			<LinkPlugin />
			<!--themes-->
			<TypeTheme />
			<LinkTheme />
			<BasicToolTheme />
		</Editor>
	{/key}

	<menu id="layout-picker">
		<span>Layout</span>
		<button
			onclick={() => {
				layout = 'modern';
			}}
			class:active={layout == 'modern'}
		>
			Modern
		</button>
		<button
			onclick={() => {
				layout = 'classic';
			}}
			class:active={layout == 'classic'}
		>
			Classic
		</button>
	</menu>
</main>

<style>
	:root {
		--sl-type-font-family: Vollkorn;
		--sl-link-color: orangered;
		--sl-link-decoration: underline 2px dotted orangered;
	}

	main {
		margin-top: 3rem;
		max-width: 60ch;
	}

	#layout-picker {
		position: fixed;
		top: 2rem;
		right: 2rem;
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: 0.5rem;
		text-align: right;

		* {
			margin: 0;
		}

		span {
			opacity: 0.7;
			font-size: small;
		}

		button {
			border: none;
			border-radius: 1rem;
			background: white;
			padding: 0.2rem 0.4rem;
			opacity: 0.5;
			&.active {
				opacity: 1;
			}
		}
	}
</style>
