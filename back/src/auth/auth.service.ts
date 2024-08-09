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

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
	) {}

	async signUp(createUserDto: CreateUserDto) {
		const { email, nickname, tokenFirebase, birthdate } = createUserDto;

		const userExists = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExists) {
			if (userExists.isBanned === true)
				throw new BadRequestException(
					`User with email: ${userExists.email} is banned`,
				);
			if (userExists.state === true && userExists.isBanned === false)
				throw new BadRequestException(
					`User with email: ${userExists.email} already exists`,
				);
		}

		const parsedBirthDate = new Date(birthdate);

		const user = await this.prisma.user.create({
			data: {
				email,
				nickname,
				tokenFirebase,
				birthdate: parsedBirthDate.toISOString(),
			},
		});

		const payload = { userId: user.id, email: user.email };
		const token = await this.jwtService.sign(payload);

		const mailOptions = MailTemplates.welcomeEmail(email, nickname);
		try {
			await this.mailService.sendMail(mailOptions);
			this.logger.log(`Welcome email sent to ${email}`);
		} catch (error) {
			this.logger.error(
				`Failed to send welcome email to ${email}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				'Error sending welcome email',
			);
		}

		return {
			message: 'User created successfully',
			user,
			token,
		};
	}

	async signIn(signInDto: SignInDto) {
		const { email, tokenFirebase } = signInDto;

		this.logger.log(`Attempting to sign in user with email: ${email}`);

		const userData = await this.prisma.user.findUnique({
			where: { email },
			include: {
				friends: {
					include: {
						friend: {
							select: { id: true, nickname: true },
						},
					},
				},
				receivedFriendRequests: {
					include: {
						sender: {
							select: { id: true, nickname: true },
						},
					},
				},
				sentMessages: true,
				receivedMessages: true,
				globalChat: true,
				tournaments: true,
				organizedTournaments: true,
				teams: {
					include: {
						team: {
							include: {
								tournament: {
									include: {
										game: true,
									},
								},
							},
						},
					},
				},
				notifications: {
					include: {
						tournament: {
							include: {
								game: true,
								teams: true,
							},
						},
					},
				},
			},
		});

		if (!userData) {
			this.logger.warn(`User not found with email: ${email}`);
			throw new UnauthorizedException('Invalid credentials');
		}
		if (userData.isBanned === true)
			throw new BadRequestException(
				`User with email: ${userData.email} is banned`,
			);
		if (userData.state === false)
			throw new BadRequestException(
				`User with email: ${userData.email} does not exist`,
			);

		const payload = { userId: userData.id, email: userData.email };
		const token = await this.jwtService.sign(payload);

		this.logger.log(`User signed in successfully with email: ${email}`);

		const singlePlayerTournaments = userData.tournaments;
		const teamsTournaments = userData.teams.map(
			(team) => team.team.tournament,
		);

		const userTournaments = [
			...singlePlayerTournaments,
			...teamsTournaments,
		];

		const friends = userData.friends.map((friend) => ({
			id: friend.id, // ID de la tabla intermedia
			nickname: friend.friend.nickname,
			friendId: friend.friend.id,
		}));

		const receivedFriendRequests = userData.receivedFriendRequests.map(
			(request) => ({
				id: request.id, // ID de la tabla intermedia
				nickname: request.sender.nickname,
			}),
		);

		// Mapear las notificaciones según el formato requerido
		const notifications = userData.notifications.map((notification) => ({
			tournamentId: notification.tournamentId,
			nameTournament: notification.tournament.nameTournament,
			nameGame: notification.tournament.game.name,
			nameTeam:
				notification.tournament.teams.find(
					(team) => team.organizerId === userData.id,
				)?.name || null,
			state: notification.state,
			id: notification.id,
		}));

		const { state, tournaments, isBanned, ...userNotData } = userData;

		const user = {
			...userNotData,
			tournaments: userTournaments,
			friends,
			receivedFriendRequests,
			notifications, // Incluimos las notificaciones en el objeto user
		};

		return {
			message: 'User logged in successfully',
			user,
			token,
		};
	}
}
