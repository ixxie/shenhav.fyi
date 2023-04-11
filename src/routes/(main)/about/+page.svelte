<script lang="ts">
	import Masonry from 'svelte-bricks';

	import UserExperienceDesign from 'carbon-pictograms-svelte/lib/UserExperienceDesign.svelte';
	import University from 'carbon-pictograms-svelte/lib/University.svelte';
	import CodeSyntax from 'carbon-pictograms-svelte/lib/CodeSyntax.svelte';

	import { Section, ExperienceSection } from '$lib/layout';
	import { List } from '$lib/list';

	import { industry, academic } from '$lib/content';
</script>

<Section pictogram={UserExperienceDesign} large layout="left">
	<hgroup>
		<p>A Creative Generalist</p>
		<h1>Your Jack-of-all-Trades</h1>
	</hgroup>
	<p>
		I'm a passionate and curious person, which makes me a natural generalist. I've taught myself
		tools and methods from a variety of disciplines, and I will quickly pick up whatever is needed
		to get the job done. I'm never going to be as good as a specialist in any of these disciplines.
		Instead, think of me as your swiss army knife: I can offer you good solutions to a wide variety
		of problems.
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
<Section pictogram={CodeSyntax} layout="right">
	<hgroup>
		<p>IT Professional</p>
		<h1>Tech Industry Veteran</h1>
	</hgroup>
	<p>
		I've taken on different roles over the years, developing apps in the software industry or
		offering services as a freelancer to SMEs. I grew from one role to the next by teaching myself
		new skills every day, a habit I continue to cultivate. I keep up with the latest developments in
		the field, and keep up a wide network of contacts and channels in the industry.
	</p>
</Section>
<Masonry items={industry} idKey="role" let:item>
	<ExperienceSection {...item} />
</Masonry>
<Section pictogram={University} layout="left">
	<hgroup>
		<p>Life Scientist</p>
		<h1>Recovering Academic</h1>
	</hgroup>
	<p>
		By training, I am a biomathematician: I was interested in mathematically describing social and
		biological networks. How likely is an ecosystem to collapse if a certain species disappears? How
		quickly can a rumor spread if an influential person refuses to perpetuate it? That sort of
		thing. In the end, I decided I want to <i>do</i> stuff instead of just <i>think</i> about it, and
		decided to leave academic pursuits for professional practice.
	</p>
</Section>
<Masonry items={academic} idKey="role" let:item>
	<ExperienceSection {...item} />
</Masonry>
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
