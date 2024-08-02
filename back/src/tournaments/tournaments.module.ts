import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from 'mail/mail.service';

@Module({
	imports: [],
	providers: [TournamentsService, PrismaService, MailService],
	controllers: [TournamentsController],
	exports: [MailService],
})
export class TournamentsModule {}
