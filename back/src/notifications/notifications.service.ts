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

	async removeNotifications(id: string) {

	    const notification = await this.prisma.notification.findUnique({ where: { id } });

	    if (!notification) {
	        throw new NotFoundException(`Notificación con id: ${notification.id} no encontrada`);
	    }

	    await this.prisma.notification.update({ where: { id }, data: {state: false}});
	    return { message: 'Notification eliminada con exito' };

	}

	// async markNotificationAsViewed(
	// 	notificationId: string,
	// ): Promise<Notification> {
	// 	return this.prisma.notification.update({
	// 		where: { id: notificationId },
	// 		data: { viewed: true },
	// 	});
	// }
}
