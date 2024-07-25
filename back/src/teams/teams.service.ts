import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Teams } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';

@Injectable()
export class TeamsService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllTeams(page: number, limit: number): Promise<Teams[]> {
        const skip = (page - 1) * limit
        const teams = await this.prisma.teams.findMany({
            take: limit,
            skip
        });

        return teams
    }

    async getTeamById(id: string): Promise<Teams> {
        return await this.prisma.teams.findUnique({ where: { id } })
    }

    async createTeam(id: string, team: CreateTeamDto): Promise<Teams> {
        const manager = await this.prisma.teams.findUnique({
            where: { organizerId: id }
        });

        if (manager) throw new ConflictException('¡The user is already an organizer of a team!');

        const userTeam = await this.prisma.teams.findFirst({
            where: {
                user: {
                    some: { id }
                }
            }
        });

        if (userTeam) throw new ConflictException('¡The user is already a member of a team!');

        const teamName = await this.prisma.teams.findUnique({
            where: { name: team.name }
        });

        if (teamName) throw new ConflictException('¡The name already exists in a team!');

        const teamData: Prisma.TeamsCreateInput = {
            ...team,
            organizer: { connect: { id } },
            tournament: team.tournamentId ? { connect: { id: team.tournamentId } } : undefined,
            user: team.user ? { connect: team.user.map(user => ({ id: user.id })) } : undefined,
            createdAt: new Date()
        };

        return await this.prisma.teams.create({ data: teamData });
    }

    async updateTeam(id: string, updateTeam: UpdateTeamDto): Promise<Teams> {
        const team = await this.prisma.teams.findUnique({ where: { id } })

        if (!team) throw new NotFoundException('¡Team not exists!')

        const updateData: Prisma.TeamsUpdateInput = {
            ...updateTeam,
            tournament: updateTeam.tournamentId ? { connect: { id: updateTeam.tournamentId } } : undefined,
            user: updateTeam.user ? { connect: updateTeam.user.map(user => ({ id: user.id })) } : undefined,
        };

        return await this.prisma.teams.update({ where: { id }, data: updateData })
    }

    async deleteMember(idTeam: string, idOrganizer: string, idMember: string): Promise<Teams> {
        const team = await this.prisma.teams.findUnique({ where: { id: idTeam } })
        if (!team) throw new NotFoundException('¡Id team do not exists!')

        const organizer = await this.prisma.teams.findUnique({ where: { organizerId: idOrganizer } })

        if (!organizer) throw new NotFoundException('¡Id organizer do not exists!')

        const member = await this.prisma.teams.findUnique({ where: { id: idTeam, user: { some: { id: idMember } } } })

        if (!member) throw new NotFoundException('¡Id member do no exists!')

        return await this.prisma.teams.update({ where: { id: idTeam }, data: { user: { disconnect: { id: idMember } } } })

    }

    async deleteTeam(idOrganizer: string, idTeam: string): Promise<Teams> {
        const team = await this.prisma.teams.findUnique({ where: { id: idTeam } })
        if (!team) throw new NotFoundException('¡Team do not exists!')

        const organizer = await this.prisma.teams.findUnique({ where: { id: idOrganizer } })

        if (!organizer) throw new NotFoundException('¡Organizer do not exists!')

        return await this.prisma.teams.delete({ where: { id: idTeam } })
    }

}