<script lang="ts">
	import CloudUpload from 'carbon-pictograms-svelte/lib/CloudUpload.svelte';
	import Websites from 'carbon-pictograms-svelte/lib/Websites.svelte';
	import ArtTools_01 from 'carbon-pictograms-svelte/lib/ArtTools_01.svelte';
	import TextData from 'carbon-pictograms-svelte/lib/TextData.svelte';
	import AppDeveloper from 'carbon-pictograms-svelte/lib/AppDeveloper.svelte';

	import { Article, Section } from '$lib/layout';
</script>

<Article>
	<Section pictogram={CloudUpload} layout="right" large>
		<hgroup>
			<p>Full-Suite Web Services</p>
			<h1>Everything You Need for a Successful Launch</h1>
		</hgroup>
		<p>
			I offer a full-suite web service package for small organizations: everything you need to get
			your digital presence started or revamped. Whether you want to freshen things up with a new
			site, launch a new marketing campaign or launch a new brand, I'm your man.
		</p>
	</Section>
	<Section pictogram={Websites} layout="left">
		<hgroup>
			<p>Web Development</p>
			<h2>Websites with a twist</h2>
		</hgroup>
		<p>
			Most websites these days are build with off-the-shelf systems like WordPress, Ghost or
			Squarespace. This is fine for very basic needs, but if you want something really special, you
			need to build from scratch. As an experienced web developer, I can build you a fully
			customized, pixel-perfect website with advanced features. The sky is the limit!
		</p>
	</Section>
	<Section pictogram={ArtTools_01} layout="right">
		<hgroup>
			<p>Branding & Graphic Design</p>
			<h2>Tailored brand identities</h2>
		</hgroup>
		<p>
			Without solid branding, a website is doomed to fail. A slick logo, a refined color palette and
			well-selected fonts are tools for communicating your value proposition to your audience. But
			without an underlying brand identity - designed to fit <i>your</i> business and <i>your</i> market,
			you will be shooting in the dark. Whether you have an existing brand that needs a face-lift, or
			you are launching a shiny new brand, I can set you up with everything you need.
		</p>
	</Section>
	<Section pictogram={TextData} layout="left">
		<hgroup>
			<p>Copywriting & Technical Writing</p>
			<h2>Writing that packs a punch</h2>
		</hgroup>
		<p>
			I've got extensive experience writing in English in a wide variety of contexts. Whether its
			marketing copy for your website, technical documentation for your customers or team, or
			writing grant applications: I got you covered. Distilling an overwhelming wealth of
			information into a delightful, relevant bite-sized essence is not easy. I'll help you find
			select the content, structure the message and refine the tone so your message will be heard.
		</p>
	</Section>
	<Section pictogram={AppDeveloper}>
		<hgroup>
			<p>IT Consulting</p>
			<h2>Modern business tooling</h2>
		</hgroup>
		<p>
			Are there some internal processes you are struggling with? Ever wonder if the right kind of
			app could save you a lot of time, money and headaches? I've helped with selection and
			management of tools in startups, and I keep up with the latest and greatest in business
			productivity apps. I can help you find and setup the right solution for your situation and
			budget.
		</p>
	</Section>
</Article>
