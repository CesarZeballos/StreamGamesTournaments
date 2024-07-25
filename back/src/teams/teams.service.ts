import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Teams } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './teams.dto';
import { teamsData } from 'src/helpers/teams.helpers';

export interface TeamWithUser extends Prisma.TeamsGetPayload<true> {
    user?: { id: string }[];
}
@Injectable()
export class TeamsService {
    constructor(private readonly prisma: PrismaService) { }

    // async getAllTeams(page: number, limit: number): Promise<Teams[]> {
    //   const skip = (page - 1) * limit
    // const teams = await this.prisma.teams.findMany({
    //   take: limit,
    // skip
    //});

    // return  teams 


    async getAllTeams(page: number, limit: number): Promise<TeamWithUser[]> {
        const skip = (page - 1) * limit;

        // Obtener equipos reales desde Prisma
        const teamsFromPrisma = await this.prisma.teams.findMany();

        // Datos ficticios completos transformados para que coincidan con la estructura
        const dataHelperes: TeamWithUser[] = teamsData.map(team => ({
            id: team.id,
            name: team.name,
            createdAt: new Date(), // Aquí usa una fecha real si es necesario
            urlAvatar: team.urlAvatar,
            organizerId: team.organizerId,
            tournamentId: team.tournamentId,
            user: team.user
        }));

        // Combina los datos reales y ficticios
        const combinedData: TeamWithUser[] = [...teamsFromPrisma, ...dataHelperes];

        // Aplicar paginación a la combinación de datos
        const paginatedData = combinedData.slice(skip, skip + limit);

        // Retornar solo los datos paginados
        return paginatedData;
    }




    async getTeamById(id: string): Promise<Teams> {
        const team = await this.prisma.teams.findUnique({ where: { id } })
        if (!team) throw new NotFoundException(`Team id ${id} do not exists`)

        return team
    }

    async createTeam(id: string, team: CreateTeamDto): Promise<Teams> {

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
            user: { connect: { id } },
            createdAt: new Date()
        };

        return await this.prisma.teams.create({ data: teamData });
    }

    async updateTeam(id: string, updateTeam: UpdateTeamDto): Promise<Teams> {
        const team = await this.prisma.teams.findUnique({ where: { id } })

        if (!team) throw new NotFoundException('¡Team not exists!')


        if (updateTeam.user) {
            for (const newUser of updateTeam.user) {
                const userExists = await this.prisma.user.findUnique({ where: { id: newUser.id } })

                if (!userExists) {
                    throw new NotFoundException(`¡User with ID ${newUser.id} does not exist!`)
                }

                const teamMembers = await this.prisma.teams.findUnique({
                    where: { id: updateTeam.id },
                    select: { user: true }
                });

                if (teamMembers && teamMembers.user.length >= 5) {
                    throw new ConflictException(`The team already has 5 members. Cannot add more users.`);
                }

                const userInTeam = await this.prisma.teams.findFirst({
                    where: {
                        id,
                        user: {
                            some: {
                                id: newUser.id,
                            }
                        }
                    }
                })

                if (userInTeam) {
                    throw new ConflictException(`¡User with ID ${newUser.id} is already a member of this team!`)
                }
            }
        }


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