import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
	BadRequestException,
	ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tournament, User, UserFriends } from '@prisma/client';
import { UpdateUserDto } from 'auth/dto/auth.user.Dto';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

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

	async addFriend(userId: string, friendId: string): Promise<User[]> {
		if (userId === friendId) {
			throw new BadRequestException(
				'No se puede agregar a sí mismo como amigo',
			);
		}

		const [user, friend] = await this.prisma.$transaction([
			this.prisma.user.findUnique({ where: { id: userId } }),
			this.prisma.user.findUnique({ where: { id: friendId } }),
		]);

		if (!user) {
			throw new NotFoundException(
				`Usuario con id ${userId} no encontrado`,
			);
		}

		if (!friend) {
			throw new NotFoundException(
				`Usuario amigo con id ${friendId} no encontrado`,
			);
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
			throw new ConflictException('Ya son amigos');
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
				OR: [{ id: userId }, { id: friendId }],
			},
			include: {
				friends: true,
			},
		});
	}

	async removeFriend(id: string, friendId: string): Promise<void> {
		if (id === friendId) {
			throw new BadRequestException(
				'No se puede eliminar a sí mismo como amigo',
			);
		}

		try {
			// Verificar si ambos usuarios existen
			const user = await this.prisma.user.findUnique({ where: { id } });
			const friend = await this.prisma.user.findUnique({
				where: { id: friendId },
			});

			if (!user || !friend) {
				throw new NotFoundException('Usuario o amigo no encontrado');
			}

			// Eliminar la amistad en ambas direcciones
			await this.prisma.$transaction(async (prisma) => {
				await prisma.userFriends.deleteMany({
					where: {
						userId: id,
						friendId: friendId,
					},
				});

				await prisma.userFriends.deleteMany({
					where: {
						userId: friendId,
						friendId: id,
					},
				});
			});
		} catch (error) {
			// Manejar cualquier error inesperado
			throw new InternalServerErrorException(
				'Error interno del servidor',
			);
		}
	}

	async addFriendRequest(friend: any) {}
}
