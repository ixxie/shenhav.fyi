<style>
	:global {
		.svelte-lexical {
			.sl-content {
				margin-top: 3rem;
				max-width: 60ch;
				min-height: 10rem;
			}

			.sl-hoverbar {
				position: absolute;
				height: 40px;
				/* appearance */
				cursor: pointer;
				background: white;
				border-radius: 1rem;
				padding: 0.35rem;
				/* layout */
				display: none;
				flex-flow: row;
				align-items: center;
				justify-content: space-around;
				z-index: 999;
			}

			.sl-debug {
				font-size: smaller;
				opacity: 0.4 !important;
			}

			.sl-tool {
				border: none;
				background: white;
				padding: 0.2rem;
				font-weight: bold;
				border-radius: 1rem;
			}

			.sl-icon {
				width: var(--sl-icon-size, 1rem);
				height: var(--sl-icon-size, 1rem);
				mask: var(--sl-icon) center/100%;
				background-color: var(--sl-icon-color, #222);
			}
		}
	}
</style>
