import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { Fetchs } from 'utils/fetch.cb';

@Module({
	providers: [GamesService, PrismaService, Fetchs],
	controllers: [GamesController],
})
export class GamesModule { }
