<script lang="ts">
	import { industry, academic, volunteering } from '$lib/content';
	import { Section, CvExperienceSection as ExperienceSection } from '$lib/layout';
	import { List } from '$lib/list';

	import UserExperienceDesign from 'carbon-pictograms-svelte/lib/UserExperienceDesign.svelte';
	import University from 'carbon-pictograms-svelte/lib/University.svelte';
	import CodeSyntax from 'carbon-pictograms-svelte/lib/CodeSyntax.svelte';
	import Advocate from 'carbon-pictograms-svelte/lib/Advocate.svelte';

	import './cv.css';
</script>

<article class="cv">
	<Section pictogram={UserExperienceDesign} large layout="left">
		<hgroup>
			<p>Curiculum Vitae</p>
			<h1>Matan Bendix Shenhav</h1>
		</hgroup>
		<p
			style="font-size: smaller; font-weight: bold; color: hsl(var(--color), 30%, 50%); margin-bottom: 0.8rem;"
		>
			www.shenhav.fyi ∙ +33 (0)6 42 31 84 04 ∙ matan@shenhav.fyi
		</p>
		<p>
			I'm a Dutch/Israeli web developer and designer based in Savoie. I'm passionate and
			curious, making me a natural generalist. My international background means I speak
			a few languages alright but I use mainly English in professional contexts.
		</p>
		<List
			items={[
				'English (native)',
				'Dutch (fluent)',
				'Hebrew (fluent)',
				'German (basic)',
				'French (basic)'
			]}
			small
		/>
	</Section>
	
	<Section pictogram={CodeSyntax} layout="right">
		<hgroup>
			<p>IT Professional</p>
			<h1>Tech Industry Veteran</h1>
		</hgroup>
		<p>
			I've taken on different roles over the years, developing apps in the software industry or
			offering services as a freelancer to SMEs. I tend to learn on the job and I try to keep up
			with the latest developments.
		</p>
	</Section>
	<ExperienceSection
		start="10/22"
		role="Freelance Web Developer"
		summary="Contracting to provide development and design services for startups and small businesses"
		skills={['Svelte', 'SvelteKit', 'Typescript', 'Three.js', 'Vercel']}
	/>
	{#each industry as section}
		<ExperienceSection {...section} />
	{/each}
	<hr />
	<Section pictogram={Advocate} layout="left">
		<hgroup>
			<p>Civic Dilettante</p>
			<h1>Engaged Citizen</h1>
		</hgroup>
		<p>
			In recent years I have gotten interested in the civil society, in particular the associative sector
			and the social economy. I've also been interested in agroecological practices and community-orientated
			living for years. 
		</p>
	</Section>
    {#each volunteering as section}
		<ExperienceSection {...section} />
	{/each}
	
	<Section pictogram={University} layout="left">
		<hgroup>
			<p>Life Scientist</p>
			<h1>Recovering Academic</h1>
		</hgroup>
		<p>
			By training, I am a biomathematician: I was interested in mathematically describing social and
			biological networks. In the end, I decided I want to <i>do</i> stuff instead of just <i>think</i> 
			about it, and decided to leave academic pursuits for professional practice.
		</p>
	</Section>
	{#each academic as section}
		<ExperienceSection {...section} />
	{/each}
</article>

<style>
	article {
		column-count: 2;
		column-gap: 8%;
		column-width: 46%;
		width: 100%;
	}

	:root {
		--color: 110;
		--spacing: 0.5em;
	}

	:global(h1),
	:global(h2) {
		color: hsl(var(--color), 50%, 25%);
	}

	:global(hgroup) :global(p:first-of-type) {
		color: hsl(var(--color), 30%, 40%);
	}

	.cv :global(svg.picto) {
		fill: hsl(var(--color), 30%, 50%);
		width: 150px;
	}

	.cv :global(h2) {
		font-size: 20px;
	}
</style>
