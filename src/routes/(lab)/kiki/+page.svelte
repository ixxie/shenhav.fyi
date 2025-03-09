<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	import Schematics from './Schematics.svelte';
	import { config } from './config.js';
	import { SchematicState } from './state.svelte.js';

	let element = $state<HTMLElement>();

	let schematic = $state<SchematicState>();

	$effect(() => {
		if (element && !schematic) {
			schematic = new SchematicState(element, config);
		}
	});
</script>

<main
	bind:this={element}
	style="--focus-color: {schematic?.focus?.color ?? 'white'}"
>
	<aside>
		<menu>
			<h1>Kiki the Campervan</h1>
			<ul>
				{#if schematic?.all}
					<li>
						<input type="checkbox" bind:checked={schematic.all.visible} />
						<button
							class="tag"
							onclick={() => {
								schematic.all.visible = !schematic.all.visible;
							}}>All</button
						>
					</li>
				{/if}
				{#each schematic?.tags ?? [] as tag}
					<li class="category">
						<span class="row">
							<input type="checkbox" bind:checked={tag.visible} />
							<button
								class="tag"
								onclick={() => {
									if (tag.visible === true && schematic?.all.visible !== true) {
										tag.visible = false;
									} else {
										if (schematic?.all) {
											schematic.all.visible = false;
											tag.visible = true;
										}
									}
								}}>{tag.name}</button
							>
						</span>
						<ul>
							{#each tag?.objects ?? [] as object}
								<li class="row">
									<input type="checkbox" bind:checked={object.visible} />
									<button
										onclick={(e) => object.toggle(e)}
										class:focused={object.focused}
										disabled={!object.visible}
									>
										{object?.name?.replaceAll('_', ' ')}
									</button>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</menu>
	</aside>
	<figure>
		<Schematics />
		<figcaption style="text-align: center;">
			{#if (schematic?.focus ?? null) !== null}
				<b>{schematic.focus.name.replaceAll('_', ' ')}</b> <br />
				<i
					>{schematic.focus.dim.length} x {schematic.focus.dim.width} x {schematic
						.focus.dim.height} mm
				</i>
			{/if}
		</figcaption>
	</figure>
</main>

<style>
	main {
		height: 100dvh;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: flex-start;
	}

	* {
		font-family: monospace;
		font-size: 15px;
	}

	h1 {
		font-size: 20px;
	}

	figure {
		flex-grow: 1;
		min-height: fit-content;
		height: fit-content;
		display: flex;
		flex-flow: column;
		position: relative;

		figcaption {
			text-align: right !important;
			position: absolute;
			bottom: 4rem;
			right: 5rem;
			* {
				font-size: larger !important;
			}
		}
	}

	.row {
		display: flex;
		flex-flow: row;
		align-items: center;
		gap: 0.3rem;
	}

	aside {
		max-height: 100%;
		overflow: scroll;

		menu {
			display: flex;
			flex-flow: column !important;
			gap: 0.5rem;
			margin: 1rem;

			ul {
				list-style: none;
				padding-left: 1rem;

				li {
					padding: 0.2rem 0;
					input {
						width: 20px;
						height: 20px;
					}
				}
			}

			button {
				width: fit-content;
				border: none;
				background: none;
				padding: 0.2rem 0.3rem;

				&.focused {
					font-weight: bold;
					text-decoration: underline 2px var(--focus-color);
				}
			}
		}
	}

	.tag {
		font-weight: bold;
	}

	.category {
		margin-top: 1rem;
	}

	@media (max-width: 1200px) {
		.category {
			margin: 0 !important;
		}

		/* portrait */
		@media (max-aspect-ratio: 1/1) {
			main {
				flex-flow: column-reverse;
			}

			aside {
				flex-grow: 1;
				flex-wrap: wrap;
				width: 100%;
				padding: 0 2rem;
			}
			figure {
				width: 100dvw;
				figcaption {
					bottom: -1rem !important;
					right: 0.5rem !important;
				}
			}
		}
		/* landscape */
		@media (min-aspect-ratio: 1/1) {
			main {
				justify-content: space-around;
			}

			figure {
				flex-grow: 0;
				height: 100dvh;
				min-height: 100dvh;
				width: fit-content;

				padding: 1rem;
				padding-left: 0rem;
				:global(svg) {
					width: fit-content;
					height: 100dvh;
				}
				figcaption {
					bottom: 1rem !important;
					right: 2rem !important;
				}
			}

			aside {
				padding: 0rem;
			}

			ul {
				padding-left: 0 !important;

				ul {
					padding-left: 0.5rem !important;
				}
			}
		}
	}

	@media (max-width: 900px) {
		* {
			font-size: 11px;
		}

		button {
			padding: 0.1rem;
		}
	}
</style>
