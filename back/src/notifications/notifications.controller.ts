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

	@Post(':id')
	async updateNotificationState(
		@Param('id', new ParseUUIDPipe()) id: string,
	) {
		return this.notificationsService.updateNotificationState(id, false);
	}
}
