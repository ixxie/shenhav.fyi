<script lang="ts">
	import type { Page } from './pages';
	import { mobileMenuOpen } from '$lib/menu';

	export let currentPage: Page;
</script>

<footer class:deactivate={$mobileMenuOpen}>
	<p>
		<span> Copyright © 2023 </span>
		<span class="dash" />
		<span> Matan Bendix Shenhav </span>
		<span class="dash" />
		<span> All Rights Reserved </span>
	</p>
	<p>
		<span><i>3D Illustration credit</i></span>
		<span class="dash" />
		<span>
			<a href={currentPage.modelUrl}>{currentPage.model}</a> by
			<a href={currentPage.authorUrl}>{currentPage.author}</a>
		</span>
	</p>
	<p style="font-size: smaller; max-width: 500px;">
		<span><i>Modifications</i></span>
		<span class="dash" />
		<span>{currentPage.notes}</span>
	</p>
</footer>

<style>
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

	@media (max-width: 1100px) {
		footer p {
			flex-flow: column;
		}

		footer p .dash {
			display: none;
		}
	}
</style>
