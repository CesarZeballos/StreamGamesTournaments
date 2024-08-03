import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}

	async banUser(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			throw new Error('User not found');
		}
		return this.prisma.user.update({
			where: { id: userId },
			data: {
				state: false,
			},
		});
	}

	async updateRole(userId: string, role: Role) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return this.prisma.user.update({
			where: { id: userId },
			data: { role },
		});
	}
}
