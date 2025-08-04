<footer>
	<p>
		<span> Copyright © 2023 </span>
		<span class="dash"></span>
		<span> Matan Bendix Shenhav </span>
		<span class="dash"></span>
		<span> All Rights Reserved </span>
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

	@media print {
		footer {
			display: none;
		}
	}
</style>
