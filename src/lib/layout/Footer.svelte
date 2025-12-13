<footer>
	<p>
		<span> Copyright © {new Date().getFullYear()} </span>
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
		opacity: 0.8 !important;

		p {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			gap: 0.5em;

			.dash::before {
				content: '-';
			}

			@media (max-width: 1100px) {
				flex-flow: column;

				.dash {
					display: none;
				}
			}
		}

		@media print {
			display: none;
		}
	}
</style>
