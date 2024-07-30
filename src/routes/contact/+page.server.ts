import { sendEmail } from '$lib/server/email';

import type { RequestEvent } from '@sveltejs/kit';

import type { Actions } from './$types';
import type { FormResponse } from '$lib/form';

export const actions: Actions = {
	contact: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const comp = data.get('company') ? `(${data.get('company')})` : '';
		try {
			await sendEmail({
				to: 'matan@shenhav.fyi',
				from: 'website@shenhav.fyi',
				subject: `[contact]: ${data.get('name')} ${comp}`,
				text: textContactTemplate(data),
				html: htmlContactTemplate(data)
			});
		} catch (error) {
			console.error(error);
			return {
				category: 'unhandled-error',
				title: 'Unknown Error',
				message: 'Looks like we have a bug in our site, please try again later or send us an email.'
			} as FormResponse;
		}
		return {
			category: 'message-sent',
			title: 'Message sent',
			message: 'We will get back to you as soon as possible!'
		} as FormResponse;
	}
};

function textContactTemplate(data: FormData) {
	return `
		CONTACT FORM

		Name: ${data.get('name')}
		Email: ${data.get('email')}
		Company: ${data.get('company') ?? 'not provided'}

		Message:

			${data.get('message')}
		`;
}

function htmlContactTemplate(data: FormData) {
	return `
		<b>Contact Form</b> <br/><br/>

		<b>Name:</b> ${data.get('name')} <br/>
		<b>Email:</b> ${data.get('email')} <br/>
		<b>Company:</b> ${data.get('company') ?? '<i>not provided</i>'} <br/><br/>

		<b>Message:</b> <br/><br/>

		<p style="text-indent: 10px;">
			${data.get('message')}
		</p>
	`;
}
