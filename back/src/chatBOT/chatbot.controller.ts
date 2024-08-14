import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('chatbot')
export class ChatbotController {
	constructor(private readonly chatbotService: ChatbotService) {}

	@Post('message')
	async handleMessage(@Body() body: { message: string }) {
		const sessionId = uuidv4(); // Genera un nuevo ID de sesión para cada conversación
		const queries = [body.message];
		const result = await this.chatbotService.executeQueries(
			queries,
			sessionId,
		);
		return result;
	}
}
