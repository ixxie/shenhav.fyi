<script lang="ts">
	import { Close } from '$lib/icons';

	import { mobileMenuOpen } from './stores';
	import Logo from './Logo.svelte';
	import MenuSocial from './MenuSocial.svelte';

	export let pages: string[];
	export let active: string;

	const hideMobileMenu = () => ($mobileMenuOpen = false);
</script>

<nav>
	<header>
		<Logo on:click={hideMobileMenu} />
		<button on:click={hideMobileMenu}>
			<Close />
		</button>
	</header>
	<div id="links">
		<a class:active={'home' == active} href="/" on:click={hideMobileMenu}> home </a>
		{#each pages as page}
			<a class:active={page == active} href="/{page}" on:click={hideMobileMenu}>
				{page}
			</a>
		{/each}
	</div>
	<MenuSocial />
</nav>

<style>
	button {
		border: 0;
		padding: 0;
		background: none;
		display: none;
	}

	nav {
		display: none;
	}

	#links {
		flex-grow: 1;
		display: flex;
		flex-flow: column;
		justify-content: center;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	@media (max-width: 700px) {
		nav {
			position: fixed;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: 1rem;
			width: 100%;
			height: 100%;
			min-height: 100%;
			margin: 0;
			padding: 1rem;

		}

		nav a {
			display: block;
			text-transform: uppercase;
			font-size: 1.3rem;
			text-align: right;
			margin: 2rem 0;
		}

		button {
			display: inline-block;
		}
	}
</style>
