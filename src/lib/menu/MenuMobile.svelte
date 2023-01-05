<script lang="ts">
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	import { mobileMenuOpen } from './stores';
	import Logo from './Logo.svelte';
	import MenuSocial from './MenuSocial.svelte';

	export let pages: string[];
	export let active: string;
	export let iconSize: 20 | 16 | 24 | 32 | undefined;

	const hideMobileMenu = () => ($mobileMenuOpen = false);
</script>

<nav>
	<span>
		<Logo {active} on:click={hideMobileMenu} />
		<button on:click={hideMobileMenu}>
			<Close size={iconSize} />
		</button>
	</span>
	<div>
		{#each pages as page}
			<a class:active={page == active} href="/{page}" on:click={hideMobileMenu}>
				{page}
			</a>
		{/each}
	</div>
	<MenuSocial {iconSize} />
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

	div {
		padding-top: 1em;
		padding-bottom: 1em;
	}

	span {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@media screen and (max-width: 700px) {
		nav {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			width: 100%;
			margin: 0;
		}

		nav a {
			display: block;
			text-align: right;
			width: 100%;
		}

		button {
			display: inline-block;
		}
	}
</style>
