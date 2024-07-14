<script lang="ts">
	import { page } from '$app/stores';

	import { MenuIcon, CloseIcon } from '$lib/icons';

	import Logo from './Logo.svelte';
	import MenuSocial from './MenuSocial.svelte';

	const {
		pages
	}:{
		pages: string[]
	} = $props()
	
	const active = $derived($page.url.pathname.slice(1));

	const deactivate = () => {
		const toggle = document.getElementById("menu-toggle") as HTMLInputElement;
		if (toggle) {
			toggle.checked = false;
		}
	}
</script>

<nav>
	<div id="topbar">
		<Logo onclick={deactivate} />
        <menu id="desktop-menu">
            {#each pages as page}
                <a
                    class:active={active == page}
                    href="/{page}"
					onclick={deactivate}
                >{page}</a> <span>∙</span>
            {/each}
            <MenuSocial />
        </menu>
        <button id="hamburger-button">
			<label for="menu-toggle">
				<MenuIcon />
				<CloseIcon />
			</label>
			<input type="checkbox" id="menu-toggle" />
        </button>
    </div>
    <menu id="mobile-menu">
		<a class:active={'home' == active} href="/" onclick={deactivate}> home </a>
		{#each pages as page}
			<a class:active={page == active} href="/{page}" onclick={deactivate}>
				{page}
			</a>
		{/each}
	</menu>
</nav>

<style>
	nav {
		text-transform: uppercase;
	}
	
	#topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 1rem 0;
		padding: 0 1rem;
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
		display:none;
		border:none;
		background-color: transparent;
		opacity: 0.9;

		& input[type="checkbox"] {
			appearance: none;
		}
	}

	#mobile-menu {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		transition:all 0.5s ease-in-out;
		height: 0;
		padding: 0 1.5rem;
		overflow: hidden;
		gap: 4rem;
	}

	@media screen and (max-width: 600px) {
		#hamburger-button {
			display: grid;
			place-items: center;
		}

		#desktop-menu {
			display: none;
		}

		nav :global(.close-icon) {
			display: none;
		}

		nav:has(#hamburger-button input[type="checkbox"]:checked) {
			& #mobile-menu {
				height: calc(100vh - 120px);
				margin: 3rem 0;
			}
			& :global(.menu-icon) {
				display: none;
			}
		}

		nav:has(#hamburger-button input[type="checkbox"]:checked) {
			& :global(.close-icon) {
				display: block;
			}
		}

		:global(#container):has(#hamburger-button input[type="checkbox"]:checked) {
			overflow: hidden;
		}
	}
</style>