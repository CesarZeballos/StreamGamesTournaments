/* import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './auth.user.Dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Sign up a new user' })
	@Post('signup')
	async signUp(@Body() createUserDto: CreateUserDto) {
		return await this.authService.signUp(createUserDto);
	}

	@ApiOperation({ summary: 'Sign in an existing user' })
	@Post('signin')
	async signIn(@Body() signInDto: SignInDto) {
		console.log(
			'response en el controller',
			await this.authService.signIn(signInDto),
		);
		return await this.authService.signIn(signInDto);
	}
}
 */

import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './auth.user.Dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Sign up a new user' })
	@Post('signup')
	async signUp(@Body() createUserDto: CreateUserDto) {
		return await this.authService.signUp(createUserDto);
	}

	@ApiOperation({ summary: 'Sign in an existing user' })
	@Post('signin')
	async signIn(@Body() signInDto: SignInDto) {
		return await this.authService.signIn(signInDto);
	}
}
