<script lang="ts">
	import { GithubIcon, LinkedinIcon } from '$lib/icons';
</script>

<div>
	<a aria-label="linkedin" title="linkedin" href="https://www.linkedin.com/in/matan-shenhav/">
		<div class="icon linkedin"></div>
	</a>
	<a aria-label="github" title="github" href="https://github.com/ixxie">
		<div class="icon github"></div>
	</a>
	<a aria-label="discord" title="discord" href="https://discordapp.com/users/611892156197765160">
		<div class="icon discord"></div>
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
