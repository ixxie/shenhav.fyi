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
		<hgroup class="screen">
			<p>a swiss army knife</p>
			<h1>Senior Fullstack Developer</h1>
		</hgroup>
		<hgroup class="print">
			<p>curriculum vitae</p>
			<h1>Matan Bendix Shenhav</h1>
		</hgroup>
		<ul class="info">
			<li>matan@shenhav.fyi</li>
			<li>+33 6 42 31 84 04</li>
			<li>www.shenhav.fyi</li>
			<li>Dutch citizen</li>
		</ul>
		<p>
			I've worked in a variety of positions in tech, and now freelance as a
			fullstack dev. I have a wide range of skills, and function well in small
			startup teams that require team members to wear many hats. I work hard and
			deliver clean code, but know when to cut corners to meet delivery targets.
			I've done major architectural work that tackles technical debt across the
			stack and significantly improved team velocity.
		</p>
		<List
			items={[
				'frontend',
				'backend',
				'devops',
				'ui/ux design',
				'data science',
				'writing',
				'agile'
			]}
		/>
	</Section>
	{#each industry as item}
		<ExperienceSection {...item} />
	{/each}

	<!-- Academic -->
	<Section Pictogram={University} layout="right">
		<hgroup>
			<p>academic background</p>
			<h1>Biomathematician</h1>
		</hgroup>
		<p>
			By training, I am a biomathematician: I was interested in mathematically
			describing social and biological networks. In the end, I decided I want to <i
				>do</i
			>
			stuff instead of just
			<i>think</i>
			about it, and decided to leave academic pursuits for professional practice.
		</p>
	</Section>
	{#each academic as item}
		<ExperienceSection {...item} />
	{/each}

	<!-- Volunteering -->
	<Section Pictogram={Advocate} layout="left">
		<hgroup>
			<p>community minded</p>
			<h1>Engaged Citizen</h1>
		</hgroup>
		<p>
			In recent years I have gotten interested in the civil society, in
			particular the associative sector and the social economy. I've also been
			interested in agroecological practices and community-orientated living for
			years.
		</p>
	</Section>
	{#each volunteering as item}
		<ExperienceSection {...item} />
	{/each}

	<section class="screen">
		<hgroup>
			<p>seems legit...</p>
			<h2 style="font-weight: bold">Want to know more?</h2>
		</hgroup>
		<p>
			<a href="/contact">Get in touch</a> and let's have a chat! I'm happy to share
			my experience with you.
		</p>
	</section>
</Article>

<style>
	.print {
		display: none;
	}

	.info {
		display: none;
	}

	@media print {
		.screen {
			display: none;
		}

		.print {
			display: block;
		}

		.info {
			display: flex;
			flex-flow: row;
			justify-content: space-between;

			li {
				list-style: none;
			}
		}
	}
</style>
