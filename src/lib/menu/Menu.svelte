<script lang="ts">
	import { page } from '$app/state';

	import Logo from './Logo.svelte';
	import MenuSocial from './MenuSocial.svelte';

	const {
		pages
	}: {
		pages: string[];
	} = $props();

	const active = $derived(page.url.pathname.slice(1));

	let menuOpen = $state(false);

	const toggle = () => (menuOpen = !menuOpen);
	const close = () => (menuOpen = false);
</script>

<nav class:open={menuOpen}>
	<div id="topbar">
		<Logo onclick={close} />
		<menu id="desktop-menu">
			{#each pages as page}
				<a class:active={active == page} href="/{page}" onclick={close}>{page}</a>
				<span>∙</span>
			{/each}
			<MenuSocial />
		</menu>
		<button aria-label="toggle menu" id="hamburger-button" onclick={toggle}>
			<span class="icon menu"></span>
			<span class="icon close"></span>
		</button>
	</div>
	<menu id="mobile-menu">
		<a class:active={'home' == active} href="/" onclick={close}> home </a>
		{#each pages as page}
			<a class:active={page == active} href="/{page}" onclick={close}>
				{page}
			</a>
		{/each}
		<MenuSocial />
	</menu>
</nav>

<style>
	nav {
		text-transform: uppercase;

		#topbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;
			margin: 1rem 0;
			opacity: 0.85;
			mix-blend-mode: multiply;
		}

		#desktop-menu {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;

			& :global(.logo) {
				font-size: 40px;
			}
		}

		#hamburger-button {
			display: none;
			border: none;
			background-color: transparent;
			opacity: 0.9;
			cursor: pointer;
		}

		#mobile-menu {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;
			gap: 3rem;
			transition: all 0.5s ease-in-out;
			height: 0;
			padding: 0 1.5rem;
			overflow: hidden;
		}

		@media screen and (max-width: 600px) {
			:global(.icon) {
				--icon-size: 2rem;
			}

			#hamburger-button {
				display: grid;
				place-items: center;
			}

			#desktop-menu {
				display: none;
			}

			:global(.icon.close) {
				display: none;
			}

			&.open {
				& #mobile-menu {
					height: calc(80vh);
					margin: 3rem 0;
				}
				& :global(.icon.menu) {
					display: none;
				}
				& :global(.icon.close) {
					display: block;
				}
			}
		}
	}

	:global(body):has(nav.open),
	:global(html):has(nav.open) {
		overflow: hidden;
	}
</style>
