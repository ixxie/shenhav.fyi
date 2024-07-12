<script lang="ts">
	import { Menu } from '$lib/icons';

	import { mobileMenu } from './state.svelte';
	import Logo from './Logo.svelte';
	import MenuSocial from './MenuSocial.svelte';

	const {
		pages,
		active
	} = $props<{
		pages: string[],
		active: string
	}>()

	const showMobileMenu = () => (mobileMenu.open = true);
</script>

<nav>
	<Logo />
	<div>
		{#each pages as page}
			<a
				class:active={active == page}
				href="/{page}"
			>{page}</a> <span>∙</span>
		{/each}
		<MenuSocial />
	</div>
	<button onclick={showMobileMenu}>
		<Menu />
	</button>
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 2rem 0;
		padding: 0 1rem;
		opacity: 0.85;
		mix-blend-mode: multiply;
	}

	div {
		display: flex;
		gap: 0.5em;
		align-items: center;
		height: 40px;
	}

	div > a,
	span {
		text-transform: uppercase;
		line-height: 40px;
		display: flex;
		align-items: center;
		margin: auto;
	}

	nav :global(.logo) {
		font-size: 40px;
	}

	button {
		border: 0;
		padding: 0;
		background: none;
		display: none;
	}

	@media (max-width: 700px) {
		nav {
			margin: 1rem 0;
		}

		div {
			display: none;
		}

		button {
			display: block;
			float: right;
		}
	}
</style>
