import { Module } from '@nestjs/common';
import { VersusController } from './versus.controller';
import { VersusService } from './versus.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Fetchs } from 'utils/fetch.cb';

@Module({
  controllers: [VersusController],
  providers: [VersusService, PrismaService, Fetchs]
})

export class VersusModule { }
