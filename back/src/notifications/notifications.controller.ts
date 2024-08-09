import {
	Controller,
	Get,
	Req,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	Post,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { User } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	// @Get(':id')
	// async getNotifications(@Param('id') id: string) {
	// 	const userId = id; // Asume que el ID del usuario está en el objeto `req.user`
	// 	return this.notificationsService.getNotifications(userId);
	// }

	// @Post('delete/:id')
	// async removeFriend(@Param('id', new ParseUUIDPipe()) id: string) {
	// 	return await this.notificationsService.removeNotifications(id);
	// }
}
