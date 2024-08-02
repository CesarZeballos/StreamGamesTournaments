import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto, UpdateTeamDto } from './createTeamDto';
import { Prisma, Team, User } from '@prisma/client';

@Injectable()
export class TeamsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllTeams(page: number, limit: number): Promise<Team[]> {
		const skip = (page - 1) * limit;
		const teams = await this.prisma.team.findMany({
			take: limit,
			skip,
			include: {
				tournament: true,
				users: true,
			},
		});

		return teams;
	}

	async getTeamById(id: string): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id },
			include: {
				tournament: true,
				users: true,
			},
		});
		if (!team)
			throw new NotFoundException(`Team with ID ${id} does not exist`);

		return team;
	}

	async createTeam(
		userId: string,
		createTeamDto: CreateTeamDto,
	): Promise<Team> {
		const teamData: Prisma.TeamCreateInput = {
			name: createTeamDto.name,
			organizerId: userId,
			tournament: createTeamDto.tournamentId
				? { connect: { id: createTeamDto.tournamentId } }
				: undefined,
			users: { connect: { id: userId } },
		};

		return await this.prisma.team.create({ data: teamData });
	}

	async updateTeam(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
		const team = await this.prisma.team.findUnique({ where: { id } });

		if (!team) throw new NotFoundException('Team does not exist');

		if (updateTeamDto.userIds) {
			for (const newUserId of updateTeamDto.userIds) {
				const userExists = await this.prisma.user.findUnique({
					where: { id: newUserId },
				});

				if (!userExists) {
					throw new NotFoundException(
						`User with ID ${newUserId} does not exist`,
					);
				}

				const teamMembers = await this.prisma.team.findUnique({
					where: { id },
					select: { users: true },
				});

				if (teamMembers && teamMembers.users.length >= 5) {
					throw new ConflictException(
						'The team already has 5 members',
					);
				}

				const userInTeam = await this.prisma.team.findFirst({
					where: {
						id,
						users: {
							some: { id: newUserId },
						},
					},
				});

				if (userInTeam) {
					throw new ConflictException(
						`User with ID ${newUserId} is already a member of this team`,
					);
				}
			}
		}

		const updateData: Prisma.TeamUpdateInput = {
			name: updateTeamDto.name,
			tournament: updateTeamDto.tournamentId
				? { connect: { id: updateTeamDto.tournamentId } }
				: undefined,
			users: updateTeamDto.userIds
				? {
						connect: updateTeamDto.userIds.map((userId) => ({
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
		teamId: string,
		userId: string,
		memberId: string,
	): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id: teamId },
		});
		if (!team) throw new NotFoundException('Team does not exist');

		const userInTeam = await this.prisma.team.findUnique({
			where: { id: teamId },
			select: { users: { where: { id: memberId } } },
		});

		if (!userInTeam || !userInTeam.users.length) {
			throw new NotFoundException('Member is not part of the team');
		}

		return await this.prisma.team.update({
			where: { id: teamId },
			data: { users: { disconnect: { id: memberId } } },
		});
	}

	async deleteTeam(organizerId: string, teamId: string): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id: teamId },
		});
		if (!team) throw new NotFoundException('Team does not exist');

		const organizerExists = await this.prisma.user.findUnique({
			where: { id: organizerId },
		});

		if (!organizerExists)
			throw new NotFoundException('Organizer does not exist');

		return await this.prisma.team.delete({ where: { id: teamId } });
	}
}
