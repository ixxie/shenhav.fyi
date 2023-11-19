<script lang="ts">
	import { Github, Linkedin } from '$lib/icons';
</script>

<div>
	<a href="https://www.linkedin.com/in/matan-shenhav/">
		<Linkedin />
	</a>
	<a href="https://github.com/ixxie">
		<Github />
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
