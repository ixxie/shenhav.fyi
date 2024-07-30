<script lang="ts">
	import Envelope from 'carbon-pictograms-svelte/lib/Envelope.svelte';

	import { fly } from 'svelte/transition';

	import Email from '$lib/Email.svelte';
	import { Form, Fieldset, EmailField, TextField, TextAreaField } from '$lib/form';
	import { Section } from '$lib/layout';
</script>

<article
	out:fly={{ duration: 1000, delay: 0, y: 100 }}
	in:fly={{ duration: 1000, delay: 1000, y: 100 }}
>
	<Section pictogram={Envelope} layout="left" large>
		<hgroup>
			<p>Contact</p>
			<h1>Let's Get In Touch</h1>
		</hgroup>
		<p>
			Want a quote, or just have a question? Feel free to drop me an email at <Email /> or fill the form
			below and I will usually respond within 24h. You can also find me on
			<a href="https://www.linkedin.com/in/matan-shenhav/">linkedin</a>
			and
			<a href="https://github.com/ixxie">github</a>.
		</p>
		<p>Or if you prefer, you write me directly here:</p>
	</Section>
	<section>
		<Form action="contact" submitButton="GET IN TOUCH">
			<Fieldset>
				<TextField label="Name" required />
				<EmailField required />
			</Fieldset>
			<Fieldset>
				<TextAreaField label="Message" required />
			</Fieldset>
		</Form>
	</section>
</article>
