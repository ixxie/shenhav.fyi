import sendGridMailer from '@sendgrid/mail';
import type Response from '@sendgrid/helpers/classes/response';
import { env } from '$env/dynamic/private';

export interface Email {
	to: string;
	from: string;
	subject: string;
	text?: string;
	html?: string;
}

export async function sendEmail({
	to,
	from,
	subject,
	text = '',
	html
}: Email): Promise<[Response, {}]> {
	sendGridMailer.setApiKey(env.SENDGRID_API_KEY as string);
	const response = await sendGridMailer.send({ to, from, subject, html, text });
	return response;
}
