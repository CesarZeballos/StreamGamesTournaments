import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaService } from 'prisma/service.prisma';

@Module({
  providers: [GamesService, PrismaService],
  controllers: [GamesController],
})
export class GamesModule {}
