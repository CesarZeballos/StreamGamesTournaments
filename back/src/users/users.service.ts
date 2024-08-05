import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
	BadRequestException,
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
			throw new InternalServerErrorException('Failed to get users');
		}
	}

	async getUserById(id: string): Promise<
		Partial<User> & { tournaments: Tournament[] } & {
			friends: UserFriends[];
		}
	> {
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
				friends: user.friends,
			};
		} catch (error) {
			throw new InternalServerErrorException(
				`Failed to get user with id ${id}`,
			);
		}
	}

	async getUserByEmail(email: string): Promise<User | null> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { email },
			});
			if (!user) {
				throw new NotFoundException(
					`No user found with email ${email}`,
				);
			}
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
			const deletedUser = await this.prisma.user.delete({
				where: { id },
			});
			return deletedUser;
		} catch (error) {
			throw new InternalServerErrorException(
				`Failed to disable user with id ${id}`,
			);
		}
	}

	async addFriend(userId: string, friendId: string): Promise<User[]> {
		if (userId === friendId) {
			throw new BadRequestException('Cannot add yourself as a friend');
		}

		const [user, friend] = await this.prisma.$transaction([
			this.prisma.user.findUnique({ where: { id: userId } }),
			this.prisma.user.findUnique({ where: { id: friendId } }),
		]);

		if (!user) {
			throw new NotFoundException(`User with id ${userId} not found`);
		}

		if (!friend) {
			throw new NotFoundException(`User with id ${friendId} not found`);
		}

		const existingFriendship = await this.prisma.userFriends.findFirst({
			where: {
				OR: [
					{ userId, friendId },
					{ userId: friendId, friendId: userId },
				],
			},
		});

		if (existingFriendship) {
			throw new ConflictException('Already friends');
		}

		await this.prisma.$transaction(async (prisma) => {
			await prisma.userFriends.create({
				data: {
					user: { connect: { id: userId } },
					friend: { connect: { id: friendId } },
				},
			});

			await prisma.userFriends.create({
				data: {
					user: { connect: { id: friendId } },
					friend: { connect: { id: userId } },
				},
			});
		});

		return this.prisma.user.findMany({
			where: {
				OR: [
					{ id: userId },
					{ id: friendId },
				],
			},
			include: {
				friends: true,
			},
		});
	}

	async removeFriend(userId: string, friendId: string): Promise<void> {
		if (userId === friendId) {
			throw new BadRequestException('Cannot remove yourself as a friend');
		}

		await this.prisma.$transaction(async (prisma) => {
			await prisma.userFriends.deleteMany({
				where: {
					userId,
					friendId,
				},
			});

			await prisma.userFriends.deleteMany({
				where: {
					userId: friendId,
					friendId: userId,
				},
			});
		});
	}
}
