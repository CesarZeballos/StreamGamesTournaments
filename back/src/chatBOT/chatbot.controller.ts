import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('chatbot')
export class ChatbotController {
	constructor(private readonly chatbotService: ChatbotService) {}

	@Post('message')
	async handleMessage(@Body() body: { message: string }) {
		const sessionId = uuidv4();
		const result = await this.chatbotService.detectIntent(
			body.message,
			sessionId,
		);
		return { response: result.fulfillmentText };
    }catch(error){
        console.log(error)
        throw new Error('Error al detectar el intento');
    }
}
