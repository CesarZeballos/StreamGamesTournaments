import {
	BadRequestException,
	Body,
	Controller,
	NotFoundException,
	Param,
	Patch,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) { }

	@Patch('ban/:id')
	async banUser(@Param('id') id: string) {
		try {
			const result = await this.adminService.banUser(id);
			if (!result) {
				throw new BadRequestException('User could not be banned');
			}
			return result;
		} catch (error) {
			if (error.message === 'User not found') {
				throw new NotFoundException(error.message);
			}
			throw new BadRequestException('User could not be banned');
		}
	}

	@Patch('role/:id')
	@ApiOperation({
		summary: "Update a user's role",
		description: "Updates a user's role when his ID and new role are sent",
	})
	@ApiParam({
		name: 'id',
		description: 'ID of the user whose role is to be updated',
		type: String,
		required: true,
	})
	@ApiBody({
		description: 'Roles available: [user, organizer, admin]',
		schema: {
			type: 'object',
			properties: {
				role: {
					type: 'string',
					enum: ['admin', 'user', 'organizer'],
				},
			},
			required: ['role'],
		},
	})
	@ApiResponse({
		status: 200,
		description: 'User role has been updated',
		schema: {
			example: {
				id: '56ffe0fe-c9cd-429b-aa0b-c81c076c736d',
				email: 'jeison@gmail.com',
				nickname: 'Jeison',
				tokenFirebase: 'password123',
				birthdate: '2004-12-15T00:00:00.000Z',
				urlProfile: 'https://example.com/selfie.jpg',
				urlStream: null,
				role: 'admin',
				createdAt: '2024-12-12T24:30:10.999Z',
				state: true,
			},
		},
	})
	@ApiResponse({
		status: 400,
		description: 'User could not be updated',
		schema: { example: 'User could not be updated' },
	})
	@ApiResponse({
		status: 404,
		description: 'User not found',
		schema: { example: 'User not found' },
	})
	async updateRole(@Param('id') id: string, @Body('role') role: Role) {
		try {
			const result = await this.adminService.updateRole(id, role);
			if (!result) {
				throw new BadRequestException('User could not be updated');
			}
			return result;
		} catch (error) {
			if (error.message === 'User not found') {
				throw new NotFoundException(error.message);
			}
			throw new BadRequestException('User could not be updated');
		}
	}
}
