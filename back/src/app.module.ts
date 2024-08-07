import { Module } from '@nestjs/common';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';

import { MailModule } from 'mail/mail.module';
import { AdminModule } from 'admin/admin.module';
import { TeamsModule } from 'teams/teams.module';
import { PayPalModule } from 'paypal/paypal.module';
import { FriendsModule } from './friends/friends.module';
/* import { ChatModule } from 'chat/chat.module'; */

@Module({
	imports: [
		UsersModule,
		GamesModule,
		TournamentsModule,
		AuthModule,
		PrismaModule,
		FileUploadModule,
		TeamsModule,
		PayPalModule,
		MailModule,
		AdminModule,
		FriendsModule,
		/* ChatModule, */
	],
})
export class AppModule {}
