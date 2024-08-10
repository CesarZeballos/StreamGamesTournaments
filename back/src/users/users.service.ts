import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tournament, User, UserFriends } from '@prisma/client';
import { UpdateUserDto } from 'auth/dto/auth.user.Dto';
import { Fetchs } from 'utils/fetch.cb';

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fetchs: Fetchs
	) { }

	async getAllUsers(): Promise<User[]> {

		const users = await this.prisma.user.findMany({
			include: {
				teams: true,
				tournaments: true,
				organizedTournaments: true,
				friends: true,
				sentFriendRequests: true,
				receivedFriendRequests: true,
				sentMessages: true,
				receivedMessages: true,
				globalChat: true,
			},
		});

		if (users.length === 0) throw new BadRequestException('No users found');

		return users;
	}

	async getUserById(id: string): Promise<
		Partial<User> & { tournaments: Tournament[] } & {
			friends: UserFriends[];
		}
	> {

		const userData = await this.fetchs.FindUserByUnique({ id })

		if (!userData) {
			throw new NotFoundException(`No user found with id ${id}`);
		}

		const singlePlayerTournaments = userData.tournaments;
		const teamsTournaments = userData.teams.map(
			(team) => team.team.tournament,
		);

		const userTournaments = [
			...singlePlayerTournaments,
			...teamsTournaments,
		];

		const {
			tokenFirebase,
			state,
			tournaments,
			isBanned,
			...userNotData
		} = userData;

		const user = {
			...userNotData,
			tournaments: userTournaments,
			friends: userData.friends
		}

		return user;
	}

	async getUserByEmail(email: string): Promise<User | null> {

		const user = await this.fetchs.FindUserByUnique({ email })
		if (!user) throw new NotFoundException(`No se ha encontrado ningún usuario con correo electrónico: ${email}`);

		return user;
	}

	async updateUser(id: string, data: UpdateUserDto): Promise<User> {

		const userData = await this.fetchs.FindUserByUnique({ id })
		if (!userData) throw new BadRequestException(`User does not exists`)

		const user = await this.prisma.user.update({
			where: { id },
			data,
		});

		return user;

	}

	async disableUser(id: string): Promise<User> {

		const userData = await this.fetchs.FindUserByUnique({ id })
		if (!userData) throw new BadRequestException(`User does not exists`)

		const user = await this.prisma.user.update({
			where: { id },
			data: {
				state: false
			}
		});

		return user;
	}
}
