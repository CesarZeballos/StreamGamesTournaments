import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationDto } from './dto/notifications.dto';

@Injectable()
export class NotificationsService {
	constructor(private readonly prisma: PrismaService) {}

	async createNotification(notificationDto: NotificationDto) {
		const notification = await this.prisma.notification.create({
			data: {
				receivedNotification: {
					connect: { id: notificationDto.userId },
				},
				tournament: { connect: { id: notificationDto.tournamentId } },
			},
		});
	}

	async removeNotifications(id: string) {
		const notification = await this.prisma.notification.findUnique({
			where: { id },
		});

		if (!notification) {
			throw new NotFoundException(
				`Notificación con id: ${id} no encontrada`,
			);
		}

		await this.prisma.notification.update({
			where: { id: notification.id },
			data: { state: false },
		});
		return { message: 'Notificación eliminada con éxito' };
	}
}
