import { Module } from '@nestjs/common';
import { VersusController } from './versus.controller';
import { VersusService } from './versus.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [VersusController],
  providers: [VersusService, PrismaService]
})
export class VersusModule { }
