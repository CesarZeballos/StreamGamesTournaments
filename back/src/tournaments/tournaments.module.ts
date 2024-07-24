import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';

@Module({
  providers: [TournamentsService],
  controllers: [TournamentsController],
})
export class TournamentsModule {}
