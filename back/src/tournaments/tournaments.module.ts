import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MailService } from 'mail/mail.service';
import { TournamentsController } from './tournaments.controller';
import { FileUploadService } from 'file-upload/file-upload.service';

@Module({
	imports: [],
	providers: [TournamentsService, PrismaService, MailService, FileUploadService],
	controllers: [TournamentsController],
	exports: [MailService],
})
export class TournamentsModule { }
