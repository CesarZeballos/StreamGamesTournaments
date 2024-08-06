import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tournament, User, UserFriends } from '@prisma/client';
import { UpdateUserDto } from 'auth/auth.user.Dto';

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
					receivedFriendRequests: true,
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
			throw new InternalServerErrorException('Error al obtener usuarios');
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

			const {
				tokenFirebase,
				state,
				tournaments,
				teams,
				isBanned,
				...userNotData
			} = user;

			return {
				...userNotData,
				tournaments: userTournaments,
				friends: user.friends,
			};
		} catch (error) {
			throw new InternalServerErrorException(
				`Error al obtener usuario con id: ${id}`,
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
					`No se ha encontrado ningún usuario con correo electrónico: ${email}`,
				);
			}
			return user;
		} catch (error) {
			throw new InternalServerErrorException(
				`Error al obtener usuario con email: ${email}`,
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
				`Error al actualizar usuario con id: ${id}`,
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
				`Error al eliminar usuario con id: ${id}`,
			);
		}
	}


}
