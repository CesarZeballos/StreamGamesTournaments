import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465, // O usa 587 para TLS
			secure: true, // true para port 465, false para otros puertos
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
	}

	async sendMail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
		try {
			await this.transporter.sendMail(mailOptions);
			console.log('Correo enviado con éxito');
		} catch (error) {
			console.error('Error al enviar el correo:', error);
			throw new InternalServerErrorException(
				'No se pudo enviar el correo.',
			);
		}
	}
}
