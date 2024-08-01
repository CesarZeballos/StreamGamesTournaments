import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { AuthModule } from './auth/auth.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PrismaModule } from '../prisma/prisma.module'; 
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

@Module({
	imports: [
		UsersModule,
		GamesModule,
		TournamentsModule,
		AuthModule,
		PrismaModule,
		FileUploadModule,
		TeamsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
