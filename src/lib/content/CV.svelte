<script lang="ts">
	import Dev from '$lib/sketches/Dev.svelte';
	import Academic from '$lib/sketches/Academic.svelte';
	import Heart from '$lib/sketches/Heart.svelte';

	import { Article, Section, ExperienceSection } from '$lib/layout';
	import { List } from '$lib/list';
	import { industry, academic, volunteering } from '$lib/content';
</script>

<Article>
	<Section Pictogram={Dev} layout="left">
		<hgroup class="screen">
			<p>software developer</p>
			<h1>Product Engineer<br />& Designer</h1>
		</hgroup>
		<hgroup class="print">
			<p>curriculum vitae</p>
			<h1>Matan Bendix Shenhav</h1>
		</hgroup>
		<p>
			As a senior software product engineer, I take end-to-end ownership of shipping an application
			to users. I do communication, design, architecture, devops, backend and frontend work as
			needed. I'm specialized in delivering great UX for data-intensive, technical software.
		</p>

		<p>
			Since I have a wide range of skills, and function well in startup environments which demand
			versatility. I try to balance code quality with shipping fast. I believe in investing in
			modern tooling and infrastructure to improve team velocity.
		</p>
		<List
			items={[
				'frontend',
				'backend',
				'devops',
				'ui/ux design',
				'data science',
				'communication',
				'agile'
			]}
		/>
	</Section>
	{#each industry as item}
		<ExperienceSection {...item} />
	{/each}

	<!-- Academic -->
	<Section Pictogram={Academic} layout="right">
		<hgroup>
			<p>academic background</p>
			<h1>Maths, Biology <br /> & Philosophy</h1>
		</hgroup>
		<p>I've started out in Maths & Physics and later moved towards Biomathematics.</p>
		<p>
			In my master's degree, I was interested in mathematical models of social and biological
			networks. I also spent a lot of time reading philosophy of science, trying to understand the
			limits of technical knowledge.
		</p>

		<p>
			In the end, I decided I want to <i>do</i> stuff instead of just <i>think</i> about it, and decided
			to leave the academy and try out the private sector.
		</p>
	</Section>
	{#each academic as item}
		<ExperienceSection {...item} />
	{/each}

	<!-- Volunteering -->
	<Section Pictogram={Heart} layout="left">
		<hgroup>
			<p>community minded</p>
			<h1>Human Being</h1>
		</hgroup>
		<p>
			In recent years I have gotten interested in the civil society and the social economy. I've
			also been interested in agroecological practices and community-orientated living for years.
			I've done a little volunteer work to learn more.
		</p>
	</Section>
	{#each volunteering as item}
		<ExperienceSection {...item} />
	{/each}
</Article>

<style>
	.print {
		display: none;
	}

	@media print {
		.screen {
			display: none;
		}

		.print {
			display: block;
		}
	}
</style>
