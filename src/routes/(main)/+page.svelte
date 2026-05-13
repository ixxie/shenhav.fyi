<script lang="ts">
	import { Article, Section } from '$lib/layout';

	import Hey from '$lib/sketches/Hey.svelte';
</script>

<Article>
	<Section Pictogram={Hey} layout="right">
		<hgroup>
			<p>hey, my name is</p>
			<h1>Matan Bendix<br />Shenhav</h1>
		</hgroup>
		<p>
			I'm a software product engineer: my job is to figure out how to design, build and deploy apps
			that actually help people. That means I've done <a href="/about">a little bit of everything</a
			>
			in software development. Don't hesitate to <a href="/contact">get in touch</a>.
		</p>
	</Section>
	<Section>
		<hgroup>
			<p>in short</p>
			<h1>What I do</h1>
		</hgroup>
		<p>
			I'm currently founding product engineer at
			<a href="https://qualiastudios.dev">Qualia</a>, where we are building a devops platform for
			robotics. I work mainly with modern Svelte/Kit, Python and Supabase.
		</p>
		<p>
			I'm interested in how social institutions can rapidly adapt to the challenges we face this
			century. For this reason, I spend my free time researching how to build open and sovereign
			software that is both practical and easy to deploy and maintain locally by small
			organizations.
		</p>
	</Section>
</Article>
