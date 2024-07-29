import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';

@Injectable()
export class TeamsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllTeams(page: number, limit: number): Promise<Team[]> {
        const skip = (page - 1) * limit;
        const teams = await this.prisma.team.findMany({
            take: limit,
            skip,
            include: {
                tournaments: true,
                users: true,
            },
        });

        return teams;
    }

    async getTeamById(id: string): Promise<Team> {
        const team = await this.prisma.team.findUnique({ where: { id } });
        if (!team) throw new NotFoundException(`Team with id ${id} does not exist`);

        return team;
    }

    async createTeam(id: string, team: CreateTeamDto): Promise<Team> {
        const userTeam = await this.prisma.team.findFirst({
            where: {
                users: {
                    some: { id },
                },
            },
        });

        if (userTeam) throw new ConflictException('The user is already a member of a team!');

        const teamName = await this.prisma.team.findUnique({
            where: { name: team.name },
        });

        if (teamName) throw new ConflictException('The name already exists in a team!');

        const teamData: Prisma.TeamCreateInput = {
            ...team,
            organizer: { connect: { id } },
            tournaments: team.tournamentId ? { connect: { id: team.tournamentId } } : undefined,
            users: team.user ? { connect: team.user.map((userId) => ({ id: userId })) } : undefined,
            createdAt: new Date(),
        };

        return await this.prisma.team.create({ data: teamData });
    }

    async updateTeam(id: string, updateTeam: UpdateTeamDto): Promise<Team> {
        const team = await this.prisma.team.findUnique({ where: { id } });

        if (!team) throw new NotFoundException('Team does not exist!');

        if (updateTeam.user) {
            for (const userId of updateTeam.user) {
                const userExists = await this.prisma.user.findUnique({ where: { id: userId } });

                if (!userExists) {
                    throw new NotFoundException(`User with ID ${userId} does not exist!`);
                }

                const teamMembers = await this.prisma.team.findUnique({
                    where: { id },
                    select: { users: true },
                });

                if (teamMembers && teamMembers.users.length >= 5) {
                    throw new ConflictException('The team already has 5 members. Cannot add more users.');
                }

                const userInTeam = await this.prisma.team.findFirst({
                    where: {
                        id,
                        users: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                });

                if (userInTeam) {
                    throw new ConflictException(`User with ID ${userId} is already a member of this team!`);
                }
            }
        }

        const updateData: Prisma.TeamUpdateInput = {
            ...updateTeam,
            tournaments: updateTeam.tournamentId ? { connect: { id: updateTeam.tournamentId } } : undefined,
            users: updateTeam.user ? { connect: updateTeam.user.map((userId) => ({ id: userId })) } : undefined,
        };

        return await this.prisma.team.update({ where: { id }, data: updateData });
    }

    async deleteMember(idTeam: string, idOrganizer: string, idMember: string): Promise<Team> {
        const team = await this.prisma.team.findUnique({ where: { id: idTeam } });
        if (!team) throw new NotFoundException('Team ID does not exist!');

        const organizer = await this.prisma.team.findUnique({ where: { organizerId: idOrganizer } });
        if (!organizer) throw new NotFoundException('Organizer ID does not exist!');

        const member = await this.prisma.team.findFirst({
            where: {
                id: idTeam,
                users: {
                    some: { id: idMember },
                },
            },
        });
        if (!member) throw new NotFoundException('Member ID does not exist!');

        return await this.prisma.team.update({
            where: { id: idTeam },
            data: { users: { disconnect: { id: idMember } } },
        });
    }

    async deleteTeam(idOrganizer: string, idTeam: string): Promise<Team> {
        const team = await this.prisma.team.findUnique({ where: { id: idTeam } });
        if (!team) throw new NotFoundException('Team does not exist!');

        const organizer = await this.prisma.user.findUnique({ where: { id: idOrganizer } });
        if (!organizer) throw new NotFoundException('Organizer does not exist!');

        return await this.prisma.team.delete({ where: { id: idTeam } });
    }
}
