<script lang="ts">
	export let role: string;
	export let org: string = 'freelance';
	export let start: string;
	export let end: string = 'present';
</script>

<h2>
	<span class="period">{start}-{end}</span>
	<br />
	<span class="role">{role}</span>
	<br />
	<span class="org">{org}</span>
</h2>

<p><slot /></p>

<style>
	.role {
		font-weight: bolder;
	}

	.period,
	.org {
		font-size: smaller;
		font-weight: bold;
		color: var(--text-light);
	}
</style>
