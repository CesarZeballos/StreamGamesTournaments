import { Injectable } from '@nestjs/common';
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatbotService {
	private sessionClient: SessionsClient;
	private projectId: string;

	constructor() {
		this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
		this.sessionClient = new SessionsClient({
			keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		});
	}

	async detectIntent(text: string, sessionId: string) {
		const sessionPath = this.sessionClient.projectAgentSessionPath(
			this.projectId,
			sessionId,
		);

		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: text,
					languageCode: 'es',
				},
			},
		};

		try {
			const [response] = await this.sessionClient.detectIntent(request);
			const result = response.queryResult;

			return result;
		} catch (error) {
			console.error('Error al detectar el intento:', error.message);
			throw new Error('Error al detectar el intento');
		}
	}
}
