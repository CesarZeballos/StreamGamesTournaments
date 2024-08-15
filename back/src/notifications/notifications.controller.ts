import {
	Controller,
	Get,
	Req,
	Patch,
	Param,
	Delete,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { User } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Put('delete/:id')
	async removeFriend(@Param('id', new ParseUUIDPipe()) id: string) {
		const notId = id
		return await this.notificationsService.removeNotifications(notId);
	}
}

