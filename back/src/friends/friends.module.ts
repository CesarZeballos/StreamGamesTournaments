import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Fetchs } from 'utils/fetch.cb';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, PrismaService, Fetchs]
})
export class FriendsModule { }
