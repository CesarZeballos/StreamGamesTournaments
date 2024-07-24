import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';



@Injectable()
export class GamesService {

  constructor(private readonly prisma: PrismaService) { }

  async getAllGames() {
    return this.prisma.user.findMany();
  }
}

