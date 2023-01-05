<script lang="ts">
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
	import LogoLinkedin from 'carbon-icons-svelte/lib/LogoLinkedin.svelte';

	export let iconSize: 20 | 16 | 24 | 32 | undefined;
</script>

<div>
	<a href="https://github.com/ixxie">
		<LogoGithub size={iconSize} />
	</a>
	<a href="https://www.linkedin.com/in/matan-shenhav/">
		<LogoLinkedin size={iconSize} />
	</a>
</div>

<style>
	div,
	a {
		gap: 0.5em;
		margin: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
</style>
