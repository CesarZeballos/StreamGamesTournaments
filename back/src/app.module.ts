import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [UsersModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
