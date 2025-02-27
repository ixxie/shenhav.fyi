<script lang="ts">
	import UserExperienceDesign from 'carbon-pictograms-svelte/lib/UserExperienceDesign.svelte';
	import University from 'carbon-pictograms-svelte/lib/University.svelte';
	import CodeSyntax from 'carbon-pictograms-svelte/lib/CodeSyntax.svelte';
	import Advocate from 'carbon-pictograms-svelte/lib/Advocate.svelte';

	import { Article, Section, ExperienceSection } from '$lib/layout';
	import { List } from '$lib/list';
	import { industry, academic, volunteering } from '$lib/content';
</script>

<Article>
	<Section Pictogram={UserExperienceDesign} layout="left">
		<hgroup>
			<p>A Creative Generalist</p>
			<h1>Your Jack-of-all-Trades</h1>
		</hgroup>
		<p>
			I'm a passionate and curious person, which makes me a natural generalist. I've taught myself
			tools and methods from a variety of disciplines, and I will quickly pick up whatever is needed
			to get the job done. I'm never going to be as good as a specialist in any of these
			disciplines. Instead, think of me as your swiss army knife: I can offer you good solutions to
			a wide variety of problems.
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
	<!-- Industry -->
	<Section Pictogram={CodeSyntax} layout="right">
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
	{#each industry as item}
		<ExperienceSection {...item} />
	{/each}

	<!-- Volunteering -->
	<Section Pictogram={Advocate} layout="left">
		<hgroup>
			<p>Civic Dilettante</p>
			<h1>Engaged Citizen</h1>
		</hgroup>
		<p>
			In recent years I have gotten interested in the civil society, in particular the associative
			sector and the social economy. I've also been interested in agroecological practices and
			community-orientated living for years.
		</p>
	</Section>
	{#each volunteering as item}
		<ExperienceSection {...item} />
	{/each}

	<!-- Academic -->
	<Section Pictogram={University} layout="left">
		<hgroup>
			<p>Life Scientist</p>
			<h1>Recovering Academic</h1>
		</hgroup>
		<p>
			By training, I am a biomathematician: I was interested in mathematically describing social and
			biological networks. In the end, I decided I want to <i>do</i> stuff instead of just
			<i>think</i>
			about it, and decided to leave academic pursuits for professional practice.
		</p>
	</Section>
	{#each academic as item}
		<ExperienceSection {...item} />
	{/each}

	<section>
		<hgroup>
			<p>Seems Legit...</p>
			<h1>Want to know more?</h1>
		</hgroup>
		<p>
			<a href="/contact">Get in touch</a> and let's have a chat! I'm happy to share my experience with
			you.
		</p>
	</section>
</Article>
