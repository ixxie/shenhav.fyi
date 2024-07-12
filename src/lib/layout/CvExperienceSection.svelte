<script lang="ts">
	import { List } from '$lib/list';

	const {
		role,
		org = 'Freelance',
		start,
		end = 'present',
		summary,
		details = undefined,
		skills = undefined
	} = $props<{
		role: string
		org: string
		start: string
		end: string
		summary: string
		details?: string[]
		skills?: string[]
	}>()
</script>

<section class="panel">
	<hgroup>
		<p class="meta">
			<span class="period">{start}-{end}</span><span class="org">{org}</span>
		<p>
		<h2 class="role">{role}</h2>
		
	</hgroup>
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

	.role {
		font-weight: bold;
		color: hsl(var(--color), 50%, 30%);
	}

	h2 {
		margin: 0;
	}

	.meta {
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
		width: 100%;
		align-items: center;
	}

	.period,
	.org {
		font-weight: 500;
		margin: 0;
	}

	.org {
		line-height: 1rem;
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
