import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { Prisma, Team } from '@prisma/client';
import { CreateTeamDto } from './createTeamDto';
import { PayPalService } from 'paypal/paypal.service';

@Injectable()
export class TeamsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paypalService: PayPalService,
	) { }

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

	async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {

		const tournament = await this.prisma.tournament.findUnique({
			where: { id: createTeamDto.tournamentId },
			include: { teams: { include: { users: true } } },
		});

		if (!tournament) {
			throw new NotFoundException(`Tournament with id: ${createTeamDto.tournamentId} does not exist.`);
		}

		for (const team of tournament.teams) {
			for (const userExistsInTournament of team.users) {
				if (createTeamDto.users.includes(userExistsInTournament.id)) {
					throw new ConflictException(`User with id: ${userExistsInTournament.id} already exists in the tournament.`);
				}
			}
		}

		await this.paypalService.captureOrder(createTeamDto.paypal);

		const teamData: Prisma.TeamCreateInput = {
			name: createTeamDto.name,
			organizerId: createTeamDto.organizerId,
			tournament: createTeamDto.tournamentId ? { connect: { id: createTeamDto.tournamentId } } : undefined,
			urlAvatar: createTeamDto.urlAvatar,
		};

		const team = await this.prisma.team.create({ data: teamData });

		if (createTeamDto.users && createTeamDto.users.length > 0) {
			for (const userId of createTeamDto.users) {
				const foundUser = await this.prisma.user.findUnique({
					where: { id: userId },
				});

				if (!foundUser) {
					throw new BadRequestException(`User with ID ${userId} not found`);
				}

				await this.prisma.userTeams.create({
					data: {
						userId: foundUser.id,
						nameTeam: team.id,
					},
				});
			}
		}

		return team;
	}


	async updateTeam(updateTeamDto: any): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id: updateTeamDto.id },
		});

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
					where: { id: updateTeamDto.id },
					select: { users: true },
				});

				if (teamMembers && teamMembers.users.length >= 5) {
					throw new ConflictException(
						'The team already has 5 members',
					);
				}

				const userInTeam = await this.prisma.team.findUnique({
					where: {
						id: updateTeamDto.id,

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
			where: { id: team.id },
			data: updateData,
		});
	}

	async deleteMember(teamId: string, memberId: string): Promise<Team> {
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

	async deleteTeam(teamId: string): Promise<Team> {
		const team = await this.prisma.team.findUnique({
			where: { id: teamId },
		});
		if (!team) throw new NotFoundException('Team does not exist');

		return await this.prisma.team.update({ where: { id: teamId }, data: { state: false } });
	}
}
