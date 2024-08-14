import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('historial')
export class HistorialController {
	constructor(private readonly prisma: PrismaService) {}

	@Get('privateMessages')
	async getPrivateMessages(
		@Query('senderId') senderId: string,
		@Query('receiverId') receiverId: string,
	) {
		return this.prisma.privateChat.findMany({
			where: {
				OR: [
					{ senderId, receiverId },
					{ senderId: receiverId, receiverId: senderId },
				],
			},
			orderBy: { createdAt: 'asc' }, // Ordenar por fecha
		});
	}

	@Get('globalMessages')
	async getGlobalMessages() {
		return this.prisma.globalChat.findMany({
			orderBy: { createdAt: 'asc' }, // Ordenar por fecha
		});
	}
}
