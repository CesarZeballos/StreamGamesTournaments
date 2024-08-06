import {
	Controller,
	Get,
	Param,
	Query,
	Put,
	Body,
	UseGuards,
	Delete,
	Post,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
	ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AddFriendDto, UpdateUserDto } from 'auth/auth.user.Dto';
/* import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { Role } from '@prisma/client'; */

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	/* @UseGuards(JwtAuthGuard) */
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	/* @UseGuards(JwtAuthGuard) */
	@Get('search')
	getUserByEmail(@Query('email') email: string) {
		return this.usersService.getUserByEmail(email);
	}

	/* 	@UseGuards(JwtAuthGuard) */
	@Get(':id')
	getUserById(@Param('id') id: string) {
		return this.usersService.getUserById(id);
	}

	/* @UseGuards(JwtAuthGuard) */
	@Put('update')
	updateUser(@Query('id') id: string, @Body() data: UpdateUserDto) {
		return this.usersService.updateUser(id, data);
	}

	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put('delete')
	disableUser(@Query('id') id: string) {
		return this.usersService.disableUser(id);
	}
	@Post('add-friend')
	addFriend(@Body() addFriendDto: AddFriendDto) {
		const { userId, friendId } = addFriendDto
		return this.usersService.addFriend(userId, friendId);
	}

	@Delete('remove-friend/:id')
	removeFriend(@Param('id') id: string, @Param('id') id2: string) {
		return this.usersService.removeFriend(id, id2);
	}
}
