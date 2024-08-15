import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Fetchs } from 'utils/fetch.cb';

@Module({
	controllers: [AdminController],
	providers: [AdminService, PrismaService, Fetchs],
})
export class AdminModule { }
