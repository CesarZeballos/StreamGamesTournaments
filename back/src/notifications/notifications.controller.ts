import { Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@Put('delete/:id')
	async removeFriend(@Param('id', new ParseUUIDPipe()) id: string) {
		const notId = id;
		return await this.notificationsService.removeNotifications(notId);
	}
}
