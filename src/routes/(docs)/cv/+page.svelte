<script lang="ts">
	import { industry, academic } from '$lib/content';
	import { Section, ExperienceSection } from '$lib/layout';
	import { List } from '$lib/list';

	import UserExperienceDesign from 'carbon-pictograms-svelte/lib/UserExperienceDesign.svelte';
	import University from 'carbon-pictograms-svelte/lib/University.svelte';
	import CodeSyntax from 'carbon-pictograms-svelte/lib/CodeSyntax.svelte';

	import './cv.css';
</script>

<article>
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
			I'm a Dutch/Israeli web developer and designer based in Marseille. I'm a passionate and
			curious, making me a natural generalist. I've taught myself tools and methods from a variety
			of disciplines, and I will quickly pick up whatever is needed to get the job done.
		</p>
		<List
			items={[
				'software engineering',
				'marketing',
				'ui/ux design',
				'graphic design',
				'data science',
				'agile processes',
				'business strategy',
				'project management'
			]}
		/>
	</Section>
	<Section>
		<p>
			I've got an international background, and speak a variety of languages on a conversational
			level, but mainly English in professional contexts.
		</p>
		<List
			items={[
				'English (native)',
				'Dutch (fluent)',
				'Hebrew (fluent)',
				'German (fluent)',
				'French (basic)'
			]}
			small
		/>
	</Section>
	<hr />
	<Section pictogram={CodeSyntax} layout="right">
		<hgroup>
			<p>IT Professional</p>
			<h1>Tech Industry Veteran</h1>
		</hgroup>
		<p>
			I've taken on different roles over the years, developing apps in the software industry or
			offering services as a freelancer to SMEs. I grew from one role to the next by teaching myself
			new skills every day, a habit I continue to cultivate. I keep up with the latest developments
			in the field, and keep up a wide network of contacts and channels in the industry.
		</p>
	</Section>
	<ExperienceSection
		start="10/22"
		role="Freelance Web Developer"
		summary="Contracting to provide development and design services for startups and small businesses"
		skills={['Svelte', 'SvelteKit', 'Netlify', 'Supabase']}
	/>
	{#each industry as section}
		<ExperienceSection {...section} />
	{/each}
	<hr />
	<Section pictogram={University} layout="left">
		<hgroup>
			<p>Life Scientist</p>
			<h1>Recovering Academic</h1>
		</hgroup>
		<p>
			By training, I am a biomathematician: I was interested in mathematically describing social and
			biological networks. How likely is an ecosystem to collapse if a certain species disappears?
			How quickly can a rumor spread if an influential person refuses to perpetuate it? That sort of
			thing. In the end, I decided I want to <i>do</i> stuff instead of just <i>think</i> about it, and
			decided to leave academic pursuits for professional practice.
		</p>
	</Section>
	{#each academic as section}
		<ExperienceSection {...section} />
	{/each}
</article>

<style>
	article {
		column-count: 2;
		column-gap: 5%;
		column-width: 45%;
		width: 100%;
	}

	:root {
		--color: 110;
	}

	:global(h1),
	:global(h2) {
		color: hsl(var(--color), 50%, 25%);
	}

	:global(hgroup) :global(p:first-of-type) {
		color: hsl(var(--color), 30%, 40%);
	}

	:global(svg.picto) {
		fill: hsl(var(--color), 30%, 50%);
	}
</style>
