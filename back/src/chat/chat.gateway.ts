import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(private readonly prisma: PrismaService) {}

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('sendPrivateMessage')
	async handlePrivateMessage(
		@MessageBody()
		message: {
			senderId: string;
			receiverId: string;
			content: string;
		},
	) {
		const { senderId, receiverId, content } = message;

		// Verificar que los usuarios existen
		const sender = await this.prisma.user.findUnique({
			where: { id: senderId },
		});
		const receiver = await this.prisma.user.findUnique({
			where: { id: receiverId },
		});

		if (!sender || !receiver) {
			throw new Error('Sender or receiver does not exist');
		}

		// Guardar mensaje en la base de datos
		await this.prisma.privateChat.create({
			data: {
				senderId,
				receiverId,
				post: content,
			},
		});

		// Emitir mensaje al receptor
		this.server
			.to(receiverId)
			.emit('privateMessage', { senderId, content });
	}

	@SubscribeMessage('sendGlobalMessage')
	async handleGlobalMessage(
		@MessageBody() message: { nickname: string; content: string },
	) {
		const { nickname, content } = message;

		console.log('Received nickname:', nickname);
		console.log('Looking up user with nickname:', nickname);

		// Verificar que el usuario existe
		const user = await this.prisma.user.findUnique({
			where: { nickname },
		});

		if (!user) {
			throw new Error('User does not exist');
		}

		// Guardar mensaje en la base de datos
		const savedMessage = await this.prisma.globalChat.create({
			data: {
				nickname,
				post: content,

				// Cambia el campo 'userId' a 'nickname' en la base de datos
				// 'userId' no es un campo en 'GlobalChat' según el esquema proporcionado
			},
		});

		// Emitir mensaje a todos los clientes conectados
		this.server.emit('globalMessage', { 
			id: savedMessage.id,
			nickname, 
			post: content,
			createdAt: savedMessage.createdAt});
	}

	@SubscribeMessage('getChatHistory')
	async handleGetChatHistory(client: Socket) {
    // Obtener el historial de mensajes del chat global desde la base de datos, ordenado por fecha
    const chatHistory = await this.prisma.globalChat.findMany({
        orderBy: {
            createdAt: 'asc',  // Ordena por la fecha de creación en orden ascendente (del más antiguo al más reciente)
        },
    });

	console.log('Emitiendo chatHistory', chatHistory);

    // Emitir el historial al cliente que hizo la solicitud
    client.emit('chatHistory', chatHistory);
}
}
