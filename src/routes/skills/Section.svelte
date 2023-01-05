<script lang="ts">
	export let category: string;
	export let skills: { [index: string]: string[] };

	let subsections = Object.entries(skills);
</script>

<h2>
	{category}
</h2>

{#each subsections as [subcategory, skills]}
	<h3>{subcategory}</h3>
	<p>
		∙
		{#each skills as skill}
			{skill} ∙&nbsp;
		{/each}
	</p>
{/each}

<style>
	h2 {
		font-weight: bolder;
	}

	p {
		max-width: 500px;
	}
</style>
