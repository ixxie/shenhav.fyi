<script lang="ts">
	import Email from '$lib/Email.svelte';

	import Envelope from 'carbon-pictograms-svelte/lib/Envelope.svelte';

	import { Form, Fieldset, EmailField, TextField, TextAreaField } from '$lib/form';
	import { Section } from '$lib/layout';
</script>

<Section pictogram={Envelope} layout="left" large>
	<h1>Let's Get In Touch</h1>
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
