import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification } from '@prisma/client';
import { NotificationDto } from './dto/notifications.dto';

@Injectable()
export class NotificationsService {
	constructor(private readonly prisma: PrismaService) {}

	async createNotification(notificationDto: NotificationDto) {
		// Crea la notificación en la base de datos
		const notification = await this.prisma.notification.create({
			data: {
				receivedNotification: {
					connect: { id: notificationDto.userId },
				},
				tournament: { connect: { id: notificationDto.tournamentId } },
			},
		});
	}

	async updateNotificationState(notificationId: string, state: boolean): Promise<Notification> {
		const notification = await this.prisma.notification.findUnique({ where: { id: notificationId } });
	
		if (!notification) {
		  throw new NotFoundException(`Notificación con id: ${notificationId} no encontrada`);
		}
	
		return this.prisma.notification.update({
		  where: { id: notificationId },
		  data: { state },
		});
	  }
}
