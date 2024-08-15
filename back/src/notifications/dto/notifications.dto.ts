import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NotificationDto {
	@IsString()
	userId: string;
	@IsString()
	tournamentId: string;
}
