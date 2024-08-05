import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
	ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Tournament, User, UserFriends } from '@prisma/client';
import { AddFriendDto, UpdateUserDto } from 'auth/auth.user.Dto';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) { }

	async getAllUsers(): Promise<User[]> {
		try {
			const users = await this.prisma.user.findMany({
				include: {
					teams: true,
					tournaments: true,
					organizedTournaments: true,
					friends: true,
					sentFriendRequests: true,
					sentMessages: true,
					receivedMessages: true,
					globalChat: true,
				},
			});
			if (users.length === 0) {
				console.info('No users found');
			} else {
				console.info(`Found ${users.length} users`);
			}
			return users;
		} catch (error) {
			console.error('Failed to get all users:', error);
			throw new Error('Failed to get users');
		}
	}
	async getUserById(
		id: string,
	): Promise<Partial<User> & { tournaments: Tournament[] } & { friends: UserFriends[] }> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id },
				include: {
					friends: true,
					sentFriendRequests: true,
					sentMessages: true,
					receivedMessages: true,
					globalChat: true,
					tournaments: true,
					organizedTournaments: true,
					teams: {
						include: {
							team: {
								include: {
									tournament: true,
								},
							},
						},
					},
				},
			});

			if (!user) {
				throw new NotFoundException(`No user found with id ${id}`);
			}

			const singlePlayerTournaments = user.tournaments;
			const teamsTournaments = user.teams.map(
				(team) => team.team.tournament,
			);

			const userTournaments = [
				...singlePlayerTournaments,
				...teamsTournaments,
			];

			const { tokenFirebase, state, tournaments, teams, ...userNotData } =
				user;

			return {
				...userNotData,
				tournaments: userTournaments,
				friends: user.friends
			};
		} catch (error) {
			throw new NotFoundException(`No user found with id ${id}`);
		}
	}

	async getUserByEmail(email: string): Promise<User | null> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { email },
			});
			if (user)
				throw new NotFoundException(
					`No user found with email ${email}`,
				);
			return user;
		} catch (error) {
			throw new InternalServerErrorException(
				`Failed to get user with email ${email}`,
			);
		}
	}

	async updateUser(id: string, data: UpdateUserDto): Promise<User> {
		try {
			const updatedUser = await this.prisma.user.update({
				where: { id },
				data,
			});
			return updatedUser;
		} catch (error) {
			throw new InternalServerErrorException(
				`Failed to update user with id ${id}`,
			);
		}
	}

	async disableUser(id: string): Promise<User> {
		try {
			const updatedUser = await this.prisma.user.delete({
				where: { id },
			});
			return updatedUser;
		} catch (error) {
			throw new Error(`Failed to disable user with id ${id}`);
		}
	}

	async addFriend(info: AddFriendDto) {
		const user = await this.getUserById(info.userId);
		if (!user) throw new NotFoundException(`User with id: ${info.userId} does not exist`);

		const friend = await this.getUserById(info.friendId);
		if (!friend) throw new NotFoundException(`User with id: ${info.friendId} does not exist`);

		const friendExists = user.friends.some(f => f.nickname === friend.nickname);
		if (friendExists) throw new ConflictException(`Friend with nickname: ${friend.nickname} already exists`);

		const friendData: Prisma.UserFriendsCreateInput = {
			user: { connect: { id: friend.id } }
		};

		await this.prisma.userFriends.create({ data: friendData });
	}

}
