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
		try {
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
		
				// Guardar el mensaje en la base de datos
				const savedMessage = await this.prisma.privateChat.create({
					data: {
						senderId,
						receiverId,
						post: content,
					},
				});
				
				// Formatear el mensaje para enviarlo
				const formattedMessage = {
				id: savedMessage.id,
				nickname: sender.nickname,
				post: savedMessage.post,
				createdAt: savedMessage.createdAt,
			};

			// Emitir el mensaje a la sala donde están los usuarios
			const room = this.getRoomName(senderId, receiverId);
			this.server.to(room).emit('privateMessage', formattedMessage);
		} catch (error) {
			console.error('Error handling private message:', error);
		}
	}

	// Método auxiliar para obtener el nombre de la sala común
	private getRoomName(user1Id: string, user2Id: string): string {
		return [user1Id, user2Id].sort().join('_');
	}
}
