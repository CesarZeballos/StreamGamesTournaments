import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from 'mail/mail.service';

@Module({
	providers: [TournamentsService, PrismaService],
	controllers: [TournamentsController],
})
export class TournamentsModule {}
