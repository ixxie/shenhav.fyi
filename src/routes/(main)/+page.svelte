<script lang="ts">
	import Growth from 'carbon-pictograms-svelte/lib/Growth.svelte';
	import Rocket from 'carbon-pictograms-svelte/lib/Rocket.svelte';
	import SocialWork_01 from 'carbon-pictograms-svelte/lib/SocialWork_01.svelte';
	import FlashingContent from 'carbon-pictograms-svelte/lib/FlashingContent.svelte';

	import { List } from '$lib/list';
	import { Section } from '$lib/layout';
</script>

<article>
	<Section pictogram={FlashingContent} layout="right" large>
		<hgroup>
			<p>Premium Web Experiences</p>
			<h1>Web Design that Makes a Difference</h1>
		</hgroup>
		<p>
			My name is Matan Bendix Shenhav, I'm a digital jack-of-all-trades: I've done <a href="/about"
				>a little bit of everything</a
			>, and I pick up new things quickly. This allows me to offer you a
			<a href="/services">full-suite of web services</a>. Don't hesitate to
			<a href="/contact">get in touch</a> to ask questions or get a quote!
		</p>
	</Section>
	<Section pictogram={Growth} layout="left" large>
		<hgroup>
			<p>Web Services for Small Organizations</p>
			<h2>Make an Impression with your Website</h2>
		</hgroup>
		<p>
			First impressions matter, and these days, that means your website. Your website will get that
			special touch, whether its 3D graphics, sophisticated illustrations or quality stock footage.
			Guaranteed to make a splash!
		</p>
		<p>
			Your website can power-up your team as well. I can also build advanced app-like features and
			custom integrations to optimize your processes and remove the pain-points. Let's remove your
			roadblocks!
		</p>
		<List items={['Stunning Visuals', 'Custom Functionality', 'Affordable Prices']} />
	</Section>
	<Section pictogram={SocialWork_01} layout="right" large>
		<hgroup>
			<p>Special Ops for Creative Agencies</p>
			<h2>Deliver Awesome Projects to your Customers</h2>
		</hgroup>
		<p>
			I love collaborating with other creatives. I can support in-house creative and web development
			teams with challenging projects. I have extended experience collaborating with creative
			professionals, and I'm happy to support project sales and customer relations processes.
		</p>
		<List
			items={[
				'3D for the Web',
				'Advanced Features',
				'Custom Integrations',
				'Web Development',
				'Graphic Design',
				'Branding'
			]}
		/>
	</Section>
	<Section pictogram={Rocket} layout="left" large>
		<hgroup>
			<p>Flexible Contracting for Startups</p>
			<h2>Fullstack Support with No Strings Attached</h2>
		</hgroup>
		<p>
			I also offer contracting services as a full-stack developer and UI/UX designer for tech
			startups. I'm a good
			<a href="https://wildcardpeople.com/what-is-a-wildcard-person">wildcard</a> for teams with diverse
			workloads.
		</p>
		<p>
			I'm happy to work with any technology for the right price, but I'm currently specializing on
			the following stack:
		</p>
		<List
			items={[
				'Svelte/Kit',
				'TypeScript',
				'NodeJS',
				'Python',
				'Supabase',
				'PostgreSQL',
				'GitHub',
				'Netlify',
				'Linux',
				'Bash'
			]}
		/>
	</Section>
</article>
