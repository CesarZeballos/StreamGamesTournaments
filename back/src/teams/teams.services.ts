import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './createTeamDto';

@Injectable()
export class TeamsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllTeams(page: number, limit: number): Promise<Team[]> {
		const skip = (page - 1) * limit;
		const teams = await this.prisma.team.findMany({
			take: limit,
			skip,
			include: {
				userTeamRequest: true,
				users: true,
				tournament: true,
			},
		});

		return teams;
	}

	async getTeamById(id: string): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id },
			include: { userTeamRequest: true, users: true, tournament: true },
		});
		if (!team) throw new NotFoundException(`Team id ${id} does not exist`);

		return team;
	}

	async createTeam(team: CreateTeamDto): Promise<Team> {
		const teamData: Prisma.TeamCreateInput = {
			...team,
			tournament: team.tournamentId
				? { connect: { id: team.tournamentId } }
				: undefined,
			users: team.userIds
				? { connect: team.userIds.map((userId) => ({ id: userId })) }
				: undefined,
		};

		return await this.prisma.team.create({ data: teamData });
	}

	async updateTeam(id: string, updateTeam: UpdateTeamDto): Promise<Team> {
		const team = await this.prisma.team.findUnique({ where: { id } });

		if (!team) throw new NotFoundException('Team does not exist');

		if (updateTeam.userIds) {
			for (const userId of updateTeam.userIds) {
				const userExists = await this.prisma.user.findUnique({
					where: { id: userId },
				});

				const teamMembers = await this.prisma.team.findUnique({
					where: { id },
					select: { users: true },
				});

				if (teamMembers && teamMembers.users.length >= 5) {
					throw new ConflictException(
						`The team already has 5 members. Cannot add more users.`,
					);
				}
			}
		}

		const updateData: Prisma.TeamUpdateInput = {
			...updateTeam,
			tournament: updateTeam.tournamentId
				? { connect: { id: updateTeam.tournamentId } }
				: undefined,
			users: updateTeam.userIds
				? {
						connect: updateTeam.userIds.map((userId) => ({
							id: userId,
						})),
					}
				: undefined,
		};

		return await this.prisma.team.update({
			where: { id },
			data: updateData,
		});
	}

	async deleteMember(
		idTeam: string,
		idOrganizer: string,
		idMember: string,
	): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id: idTeam },
		});
		if (!team) throw new NotFoundException('Team does not exist');

		const organizer = await this.prisma.team.findUnique({
			where: { id: idOrganizer },
		});

		if (!organizer) throw new NotFoundException('Organizer does not exist');

		const member = await this.prisma.team.findUnique({
			where: { id: idTeam, users: { some: { id: idMember } } },
		});

		if (!member) throw new NotFoundException('Member does not exist');

		return await this.prisma.team.update({
			where: { id: idTeam },
			data: { users: { disconnect: { id: idMember } } },
		});
	}

	async deleteTeam(idOrganizer: string, idTeam: string): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id: idTeam },
		});
		if (!team) throw new NotFoundException('Team does not exist');

		const organizer = await this.prisma.team.findUnique({
			where: { id: idOrganizer },
		});

		if (!organizer) throw new NotFoundException('Organizer does not exist');

		return await this.prisma.team.delete({ where: { id: idTeam } });
	}
}
