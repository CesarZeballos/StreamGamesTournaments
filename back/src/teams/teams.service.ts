import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Team } from '@prisma/client';
import { CreateTeamDto, UpdateTeamDto } from './dto/createTeamDto';
import { MailTemplates } from 'mail/mail-templates';
import { MailService } from 'mail/mail.service';
import { NotificationsService } from 'notifications/notifications.service';
import { NotificationDto } from 'notifications/dto/notifications.dto';
import { Fetchs } from 'utils/fetch.cb';

@Injectable()
export class TeamsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
		private readonly notificationService: NotificationsService,
		private readonly fetchs: Fetchs
	) { }

	async getAllTeams(page: number, limit: number): Promise<Team[]> {
		const skip = (page - 1) * limit;
		return this.prisma.team.findMany({
			take: limit,
			skip,
			include: {
				tournament: true,
				users: true,
			},
		});
	}

	async getTeamById(id: string): Promise<Team> {
		const team = await this.fetchs.FindTeamByUnique({ id });
		if (!team) throw new NotFoundException(`Team with ID ${id} does not exist`);
		return team;
	}

	async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
		const { tournamentId, organizerId, users: userIds, ...teamData } = createTeamDto;

		const tournament = await this.fetchs.FindTournamentByUnique(tournamentId);
		if (!tournament) throw new NotFoundException(`Tournament with id: ${tournamentId} does not exist.`);

		const organizer = await this.fetchs.FindUserByUnique({ id: organizerId });
		if (!organizer) throw new NotFoundException(`Organizer with id: ${organizerId} does not exist.`);

		const existingUserIds = tournament.teams.flatMap(team => team.users.map(user => user.id));
		const duplicateUsers = userIds.filter(userId => existingUserIds.includes(userId));
		if (duplicateUsers.length > 0) throw new ConflictException(`Users with IDs ${duplicateUsers.join(', ')} already exist in the tournament.`);

		const team = await this.prisma.team.create({
			data: {
				...teamData,
				organizerId,
				tournament: { connect: { id: tournamentId } },
			},
		});

		if (userIds.length > 0) {
			for (const userId of userIds) {
				const foundUser = await this.fetchs.FindUserByUnique({ id: userId });
				if (!foundUser) throw new BadRequestException(`User with ID ${userId} not found`);

				await this.prisma.userTeams.create({
					data: {
						userId: foundUser.id,
						nameTeam: team.id,
					},
				});

				const notification: NotificationDto = {
					userId: foundUser.id,
					tournamentId: tournament.id,
				};
				await this.notificationService.createNotification(notification);

				const mailOptions = MailTemplates.registeredUser(
					foundUser.email,
					foundUser.nickname,
					tournament.nameTournament,
					team.name,
					organizer.nickname,
				);
				await this.mailService.sendMail(mailOptions);
			}
		}

		const mailOptionsOrganizer = MailTemplates.registeredTeam(
			organizer.email,
			organizer.nickname,
			tournament.nameTournament,
			team.name,
		);
		await this.mailService.sendMail(mailOptionsOrganizer);

		return team;
	}

	async updateTeam(updateTeamDto: UpdateTeamDto): Promise<Team> {
		const { id, users: userIds, ...updateData } = updateTeamDto;

		const team = await this.fetchs.FindTeamByUnique({ id });
		if (!team) throw new NotFoundException('Team does not exist');

		if (userIds) {
			for (const newUserId of userIds) {
				const userExists = await this.fetchs.FindUserByUnique({ id: newUserId });
				if (!userExists) throw new NotFoundException(`User with ID ${newUserId} does not exist`);

				const teamMembers = await this.fetchs.FindTeamByUnique({ id });
				if (teamMembers && teamMembers.users.length >= 5) throw new ConflictException('The team already has 5 members');

				const userInTeam = await this.prisma.team.findUnique({
					where: { id },
					include: { users: true },
				});
				if (userInTeam.users.some(user => user.id === newUserId)) {
					throw new ConflictException(`User with ID ${newUserId} is already a member of this team`);
				}
			}
		}

		return await this.prisma.team.update({
			where: { id },
			data: {
				...updateData,
				users: userIds ? { connect: userIds.map(userId => ({ id: userId })) } : undefined,
			},
		});
	}

	async deleteMember(teamId: string, memberId: string): Promise<Team> {
		const team = await this.fetchs.FindTeamByUnique({ id: teamId });
		if (!team) throw new NotFoundException('Team does not exist');

		const userInTeam = await this.prisma.team.findUnique({
			where: { id: teamId },
			include: { users: true },
		});
		if (!userInTeam || !userInTeam.users.some(user => user.id === memberId)) {
			throw new NotFoundException('Member is not part of the team');
		}

		return await this.prisma.team.update({
			where: { id: teamId },
			data: { users: { disconnect: { id: memberId } } },
		});
	}

	async deleteTeam(teamId: string): Promise<Team> {
		const team = await this.fetchs.FindTeamByUnique({ id: teamId });
		if (!team) throw new NotFoundException('Team does not exist');

		return await this.prisma.team.update({
			where: { id: teamId },
			data: { state: false },
		});
	}
}
