import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from './dto/auth.user.Dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

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
