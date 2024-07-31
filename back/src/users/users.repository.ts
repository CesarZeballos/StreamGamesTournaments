import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/auth/auth.user.dto';
import { users as helperUsers } from 'src/helpers/users.helper';

@Injectable()
export class UsersRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getAllUsers(): Promise<User[]> {
		try {
			const users = await this.prisma.user.findMany({
				include: { teams: true, tournaments: true, organizedTeam: true },
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

	async getUserById(id: string): Promise<User | null> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id },
				include: {
					teams: true,
					tournaments: true,
					organizedTeam: true,
				},
			});
			if (user) {
				console.info(`User with id ${id} found`);
			} else {
				console.info(`No user found with id ${id}`);
				throw new NotFoundException(`No user found with id ${id}`);
			}
			return user;
		} catch (error) {
			console.error(`Failed to get user with id ${id}:`, error);
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
			if (user) {
				console.info(`User with email ${email} found`);
				return user;
			} else {
				console.info(`No user found with email ${email}`);
				throw new NotFoundException(
					`No user found with email ${email}`,
				);
			}
		} catch (error) {
			console.error(`Failed to get user with email ${email}:`, error);
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
			console.info(`User with id ${id} updated successfully`);
			return updatedUser;
		} catch (error) {
			console.error(`Failed to update user with id ${id}:`, error);
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
			console.info(`User with id ${id} disabled successfully`);
			return updatedUser;
		} catch (error) {
			console.error(`Failed to disable user with id ${id}:`, error);
			throw new Error(`Failed to disable user with id ${id}`);
		}
	}
}
