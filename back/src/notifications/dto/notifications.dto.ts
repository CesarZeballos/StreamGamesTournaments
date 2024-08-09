import { PartialType } from '@nestjs/swagger';
import {
	IsString,
	IsOptional,
	IsArray,
	ArrayNotEmpty,
	IsUUID,
	IsNotEmpty,
	IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class NotificationDto {
	@IsString()
	userId: string;
	@IsString()
	tournamentId: string;
}
