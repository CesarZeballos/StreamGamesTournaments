import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/auth.user.Dto';
import { MailService } from 'mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { MailTemplates } from 'mail/mail-templates';
import { Fetchs } from 'utils/fetch.cb';
import { Notification } from '@prisma/client';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
		private readonly fetchs: Fetchs
	) { }

	async signUp(createUserDto: CreateUserDto) {
		const { email, nickname, tokenFirebase, birthdate } = createUserDto;

		const userExists = await this.fetchs.FindUserByUnique({ email });
		if (userExists) {
			if (userExists.isBanned === true) {
				throw new BadRequestException(`User with email: ${userExists.email} is banned`);
			}
			if (userExists.state === false) {
				throw new BadRequestException(`User with email: ${userExists.email} already exists`);
			}
		}

		const user = await this.prisma.user.create({
			data: {
				email,
				nickname,
				tokenFirebase,
				birthdate: new Date(birthdate).toISOString(),
			},
		});

		const payload = { userId: user.id, email: user.email };
		const token = this.jwtService.sign(payload);

		const mailOptions = MailTemplates.welcomeEmail(email, nickname);
		try {
			await this.mailService.sendMail(mailOptions);
			this.logger.log(`Welcome email sent to ${email}`);
		} catch (error) {
			this.logger.error(`Failed to send welcome email to ${email}`, error.stack);
			throw new InternalServerErrorException('Error sending welcome email');
		}

		return {
			message: 'User created successfully',
			user,
			token,
		};
	}

	async signIn(signInDto: SignInDto) {
		const { email, tokenFirebase } = signInDto;

		if (!email || !tokenFirebase) {
			throw new BadRequestException('Email and tokenFirebase are required');
		}

		const userData = await this.fetchs.FindUserByUnique({ email });
		if (!userData) {
			throw new UnauthorizedException('Invalid credentials');
		}

		if (userData.isBanned) {
			throw new BadRequestException(`User with email: ${userData.email} is banned`);
		}
		if (!userData.state) {
			throw new BadRequestException(`User with email: ${userData.email} does not exist`);
		}

		const payload = { userId: userData.id, email: userData.email };
		const token = this.jwtService.sign(payload);

		const playerTournaments = userData.tournaments.map((tournament) => ({
			tournamentId: tournament.id,
			id: userData.id,
			nameTournament: tournament.nameTournament,
			nameTeam: null,
			nameGame: tournament.game ? tournament.game.name : null,
			tournamentDate: tournament.startDate.toISOString(),
			state: tournament.state,
		}));

		const teamTournaments = userData.teams.map((team) => ({
			tournamentId: team.team.id,
			id: userData.id,
			nameTournament: team.team.name,
			nameTeam: team.nameTeam,
			nameGame: team.team.tournament.game.name,
			tournamentDate: team.team.tournament.startDate.toISOString(),
			state: team.team.tournament.state,
		}));

		const combinedTournaments = [...playerTournaments, ...teamTournaments];

		const friendsData = userData.friends
			.filter((friend) => friend.user.id === userData.id || friend.friendId === userData.id)
			.map((friend) => ({
				id: friend.id,
				userId: friend.user.id,
				userNickname: friend.user.nickname,
				friendId: friend.friend.id,
				friendNickname: friend.friend.nickname,
			}));

		const friends = friendsData.map((f) => {
			return {
				id: f.id,
				nickname: f.userId === userData.id ? f.friendNickname : f.userNickname,
				friendId: f.userId === userData.id ? f.friendId : f.userId
			};
		});

		const receivedFriendRequests = userData.receivedFriendRequests.map(
			(request) => ({
				id: request.id,
				nickname: request.sender.nickname,
			}),
		);

		const notifications = userData.notifications.map((notification) => {
			const tournament = notification.tournament;
			const team = tournament.teams.find(team => { team.users.map(user => user.id === userData.id) });

			return {
				tournamentId: tournament.id,
				id: notification.id,
				nameTournament: tournament.nameTournament,
				nameTeam: team ? team.name : null,
				nameGame: tournament.game ? tournament.game.name : null,
				tournamentDate: tournament.startDate.toISOString(),
				state: notification.state,
			};
		});

		const { state, tournaments, isBanned, ...userNotData } = userData;
		
		const organizerTournaments = userData.organizedTournaments.map(tournament => ({
			id: tournament.id,
			nameTournament: tournament.nameTournament,
			startDate: tournament.startDate.toISOString(),
			category: tournament.category,
			maxTeams: tournament.maxTeams,
			urlAvatar: tournament.urlAvatar || '',
			state: tournament.state,
			gameName: tournament.game.name,
			teams: tournament.teams.map(team => ({
			  id: team.id,
			  name: team.name,
			})),
		  }));

		const user = {
			...userNotData,
			tournaments: combinedTournaments, // esto no sirve al front
			friends,
			receivedFriendRequests,
			notifications,
			organizerTournaments,
		};
		return {
			message: 'User logged in successfully',
			user,
			token,
		};
	}
}
