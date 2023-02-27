<script lang="ts">
	export let role: string;
	export let org: string = 'freelance';
	export let start: string;
	export let end: string = 'present';
	export let skills: string[] | undefined = undefined;
</script>

<h2>
	<span class="period">{start}-{end}</span>
	<br />
	<span class="role">{role}</span>
	<br />
	<span class="org">{org}</span>
</h2>

<p><slot /></p>

{#if skills}
	<p class="skills">
		{#each skills as skill, i}
			{@const last = i == skills?.length - 1}
			<span>{skill}</span>{#if !last}<span>∙</span>{/if}
		{/each}
	</p>
{/if}

<style>
	.role {
		font-weight: bolder;
		font-size: 23px;
	}

	.period,
	.org {
		font-size: smaller;
		font-weight: bold;
		color: var(--text-light);
	}

	.skills {
		font-family: IM Fell English SC;
		font-weight: bold;
		display: flex;
		flex-flow: row wrap;
		gap: 0.5rem;
		color: hsl(var(--color), 20%, 30%);
	}
</style>
