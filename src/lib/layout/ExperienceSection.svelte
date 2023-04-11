<script lang="ts">
	import { List } from '$lib/list';

	export let role: string;
	export let org: string = 'Freelance';
	export let start: string;
	export let end: string = 'present';
	export let summary: string;
	export let details: string[] | undefined = undefined;
	export let skills: string[] | undefined = undefined;
</script>

<section class="panel">
	<h2>
		<span class="period">{start}-{end}</span>
		<span class="role">{role}</span>
		<span class="org">{org}</span>
	</h2>
	<p>
		{summary}
	</p>
	{#if details}
		<ol>
			{#each details as detail}
				<li>{detail}</li>
			{/each}
		</ol>
	{/if}
	{#if skills}
		<List items={skills} />
	{/if}
</section>

<style>
	:root {
		--spacing: 1em;
	}

	section {
		display: flex;
		flex-flow: column;
		gap: 0.3em;
		margin: 0;
	}

	h2 {
		display: flex;
		flex-flow: column;
	}

	.role {
		font-weight: bold;
		color: hsl(var(--color), 50%, 30%);
	}

	.period,
	.org {
		font-size: smaller;
		font-weight: 500;
		color: hsl(var(--color), 20%, 40%);
	}

	ol {
		margin: var(--spacing) 0 0 0;
		padding: 0 var(--spacing) 0 calc(var(--spacing) * 1.5);
	}

	li {
		padding-bottom: var(--spacing);
		margin-left: 0.5em;
	}

	@media print {
		:root {
			--spacing: 0.5em;
		}
	}
</style>
