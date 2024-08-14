import { Injectable } from '@nestjs/common';
import { SessionsClient } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { google } from 'googleapis';

@Injectable()
export class ChatbotService {
	private sessionClient: SessionsClient;
	private projectId: string;

	constructor() {
		// Configura el cliente con las variables de entorno
		this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

		// Crea un cliente de autenticación a partir de las variables de entorno
		this.sessionClient = new SessionsClient({
			credentials: {
				private_key: process.env.GOOGLE_PRIVATE_KEY.replace(
					/\\n/g,
					'\n',
				),
				client_email: process.env.GOOGLE_CLIENT_EMAIL,
			},
		});
	}

	private async detectIntent(
		sessionId: string,
		query: string,
		contexts?: any[],
		languageCode: string = 'es',
	) {
		const sessionPath = this.sessionClient.projectAgentSessionPath(
			this.projectId,
			sessionId,
		);

		const request: any = {
			session: sessionPath,
			queryInput: {
				text: {
					text: query,
					languageCode: languageCode,
				},
			},
		};

		if (contexts && contexts.length > 0) {
			request.queryParams = { contexts: contexts };
		}

		try {
			const [response] = await this.sessionClient.detectIntent(request);
			return response.queryResult;
		} catch (error) {
			console.error('Error al detectar el intento:', error.message);
			throw new Error('Error al detectar el intento');
		}
	}

	async executeQueries(
		queries: string[],
		sessionId: string,
		languageCode: string = 'es',
	) {
		let context: any[] = [];
		let intentResponse;

		for (const query of queries) {
			try {
				console.log(`Enviando consulta: ${query}`);
				intentResponse = await this.detectIntent(
					sessionId,
					query,
					context,
					languageCode,
				);
				console.log('Intención detectada');
				console.log(
					`Texto de cumplimiento: ${intentResponse.fulfillmentText}`,
				);
				context = intentResponse.outputContexts;
			} catch (error) {
				console.error(
					'Error en la ejecución de consultas:',
					error.message,
				);
			}
		}

		return intentResponse;
	}
}
