import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TeamsService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllTeams(page: number, limit: number) {
        const skip = (page - 1) * limit
        const teams = await this.prisma.teams.findMany({
            take: limit,
            skip
        });

        return teams
    }

    async getTeamById(id: string) {
        return this.prisma.teams.findUnique({ where: { id } })
    }
}