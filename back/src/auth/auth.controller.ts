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
		return this.authService.signUp(createUserDto);
	}

	@ApiOperation({ summary: 'Sign in an existing user' })
	@Post('signin')
	async signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}
}