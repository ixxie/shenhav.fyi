<script lang="ts">
	import { setContext } from 'svelte';

	import { page } from '$app/stores';

	import { Menu, mobileMenuOpen } from '$lib/menu';
	import { Scene } from '$lib/3D';

	import '../app.css';

	import { color } from './stores';
	import { pages } from './pages';

	// page data
	const pageNames = Object.keys(pages);
	$: route = $page.route.id ?? '/';
	$: current = route == '/' ? 'home' : route.substring(1);
	$: currentPage = pages[current];

	// color logic
	const phase = 20;
	$: index = pageNames.indexOf(current);
	$: $color = phase + (index * 360) / pageNames.length;
	$: style = `--color: ${$color};`;
	setContext('color', color);

	// mobile menu logic
	let innerWidth: number;
	$: desktop = innerWidth > 780;
	$: $mobileMenuOpen = desktop ? false : $mobileMenuOpen;
</script>

<svelte:window bind:innerWidth />

<div id="content" {style}>
	<header>
		<Menu pages={['about', 'services', 'contact']} />
	</header>
	{#if !$mobileMenuOpen}
		<main>
			<div id="illustration">
				{#each pageNames as page}
					{#if page == current}
						{@const props = currentPage}
						<Scene {...props} />
					{/if}
				{/each}
			</div>
			<slot />
		</main>
		<footer>
			<p>
				<span>
				Copyright © 2023
				</span>
				<span class="dash"/>
				<span>
				Matan Bendix Shenhav
				</span>
				<span class="dash"/>
				<span>
				All Rights Reserved
				</span>
			</p>
			<p>
				<span><i>3D Illustration credit</i></span>
				<span class="dash"/>
				<span><a href={currentPage.modelUrl}>{currentPage.model}</a> by <a href={currentPage.authorUrl}>{currentPage.author}</a></span>
			</p>
			<p style="font-size: smaller; max-width: 500px;">
				<span><i>Modifications</i></span>
				<span class="dash"/>
				<span>{currentPage.notes}</span>
			</p>
		</footer>
	{/if}
</div>
<div id="background" {style} />

<style>
	:global(body) {
		height: 100%;
		width: 100%;
		max-width: 100%;
		display: flex;
		justify-items: flex-start;
		justify-content: flex-start;
		overflow: overlay;
	}

	#content {
		max-width: 1100px;
		min-height: 100%;
		flex-grow: 1;
		display: flex;
		flex-flow: column;
		padding-left: 100px;
	}

	main {
		margin: 0 2rem 5rem 2rem;
		flex-grow: 1;
	}

	#background {
		background: repeating-linear-gradient(
			-45deg,
			hsl(var(--color), 50%, 90%),
			hsl(var(--color), 50%, 90%) 3px,
			hsl(var(--color), 50%, 91%) 3px,
			hsl(var(--color), 50%, 91%) 6px
		);
		position: fixed;
		z-index: -100;
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: row nowrap;
	}

	#illustration {
		position: fixed;
		right: 0;
		top: 0;
		width: calc(100vw - 1100px);
		height: 100vh;
		z-index: -99;
	}

	footer {
		padding: 3rem 0;
		display: flex;
		flex-flow: column;
		align-items: center;
		text-align: center;
		gap: 1rem;
		opacity: 0.5;
	}

	footer p {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		gap: 0.5em;
	}

	.dash::before {
		content: '-';
	}

	@media (max-width: 1800px) {
		:global(body) {
			justify-content: center;
		}

		#content {
			padding: 0;
		}

		#illustration {
			height: 100vh;
			width: 100%;
			position: static;
			margin: -200px 0;
		}
	}
	@media (max-width: 1100px) {
		#content {
			width: 100%;
			max-width: 100%;
		}

		footer p {
			flex-flow: column;
		}

		footer p .dash {
			display: none;
		}
	}

	@media (max-width: 700px) {
		header {
			height: 100%;
		}

		main {
			margin: 0;
			padding: 1rem;
		}
	}

	:global(a),
	:global(h1),
	:global(h2) {
		color: hsl(var(--color), 50%, 20%);
	}

	:global(.quote) {
		color: hsl(var(--color), 50%, 30%);
	}

	:global(svg.picto) {
		fill: hsl(var(--color), 30%, 50%);
	}

	:global(::-webkit-scrollbar) {
		width: 6px;
		background: transparent;
	}

	:global(::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: rgb(100, 100, 100, 0.4);
		border-radius: 3px;
	}
</style>
