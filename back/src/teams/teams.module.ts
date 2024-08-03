import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { TeamsService } from './teams.service';

@Module({
	providers: [TeamsService, PrismaService],
	controllers: [TeamsController],
})
export class TeamsModule {}
