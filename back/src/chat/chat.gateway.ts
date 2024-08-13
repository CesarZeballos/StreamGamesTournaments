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

	@SubscribeMessage('joinChat')
	async handleJoinChat(
		client: Socket,
		@MessageBody() data: { user1Id: string; user2Id: string },
	) {
		const { user1Id, user2Id } = data;

		console.log('Client:', client);

		if (!client) {
			console.error('Client is undefined');
			return;
		}

		// Verificar que los usuarios existen
		const user1 = await this.prisma.user.findUnique({
			where: { id: user1Id },
		});
		const user2 = await this.prisma.user.findUnique({
			where: { id: user2Id },
		});

		if (!user1 || !user2) {
			throw new Error('One or both users do not exist');
		}

		// Unir a los usuarios a una sala común
		const room = this.getRoomName(user1Id, user2Id);
		client.join(room);

		// Cargar los últimos 50 mensajes de la conversación
		const lastMessages = await this.prisma.privateChat.findMany({
			where: {
				OR: [
					{ senderId: user1Id, receiverId: user2Id },
					{ senderId: user2Id, receiverId: user1Id },
				],
			},
			orderBy: { createdAt: 'desc' },
			take: 50,
			select: {
				id: true,
				post: true,
				createdAt: true,
				sender: {
					select: {
						nickname: true,
					},
				},
			},
		});

		// Mapear los mensajes en la estructura deseada
		const formattedMessages = lastMessages.map((message) => ({
			id: message.id,
			nickname: message.sender.nickname,
			post: message.post,
			createdAt: message.createdAt,
		}));

		// Enviar los mensajes al cliente que se conectó
		client.emit('loadPreviousMessages', formattedMessages);
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
			content,
			createdAt: savedMessage.createdAt});
	}
}
