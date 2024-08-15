import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from '../../prisma/prisma.service';
import { HistorialController } from './chat.historial.controller';

@Module({
	providers: [ChatGateway, PrismaService],
	controllers: [HistorialController],
})
export class ChatModule {}
