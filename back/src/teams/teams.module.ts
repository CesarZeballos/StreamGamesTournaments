import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { PayPalModule } from 'paypal/paypal.module';
import { MailService } from 'mail/mail.service';
@Module({
	imports: [PayPalModule],
	providers: [TeamsService, PrismaService, MailService],
	controllers: [TeamsController],
	exports: [TeamsService],
})
export class TeamsModule {}
