import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway'; // Asegúrate de que la ruta sea correcta
import { PrismaService } from '../../prisma/prisma.service'; // Asegúrate de que la ruta sea correcta
import { HistorialController } from './chat.historial.controller';

@Module({
	providers: [ChatGateway, PrismaService],
	controllers: [HistorialController],
})
export class ChatModule {}
