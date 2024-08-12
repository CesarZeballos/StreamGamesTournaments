import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';
import { Fetchs } from 'utils/fetch.cb';

@Injectable()
export class AdminService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fetchs: Fetchs
	) { }

	async banUser(userId: string) {
		const user = await this.fetchs.FindUserByUnique({ id: userId })
		if (!user) throw new NotFoundException(`User with id: ${userId} does not exists`)

		if (user.isBanned === true) {
			return this.prisma.user.update({
				where: { id: userId },
				data: { state: false, isBanned: true },
			});

		} else return this.prisma.user.update({
			where: { id: userId },
			data: { state: true, isBanned: false },
		});
	}

	async updateRole(userId: string, role: Role) {
		const user = await this.fetchs.FindUserByUnique({ id: userId })
		if (!user) throw new NotFoundException(`User with id: ${userId} does not exists`)

		return this.prisma.user.update({
			where: { id: userId },
			data: { role },
		});
	}
}
