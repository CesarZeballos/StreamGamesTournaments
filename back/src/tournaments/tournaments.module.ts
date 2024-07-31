import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [TournamentsService, PrismaService, MailService],
  controllers: [TournamentsController],
})
export class TournamentsModule {}
