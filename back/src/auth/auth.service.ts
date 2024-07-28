import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, SignInDto } from '../auth/auth.user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async signUp(createUserDto: CreateUserDto) {
		const { email, nickName, tokenFirebase, birthDate, teamId } =
			createUserDto;

		const userExists = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userExists) {
			throw new BadRequestException('User already exists');
		}

		//const hashedPassword = await bcrypt.hash(tokenFirebase, 10);

		const parsedBirthDate = new Date(birthDate);

		const user = await this.prisma.user.create({
			data: {
				email,
				nickName,
				tokenFirebase,
				birthDate: parsedBirthDate.toISOString(),
				team: teamId
					? {
							connect: { id: teamId },
						}
					: undefined,
			},
		});

		console.log('user', user);

		return {
			message: 'User created successfully',
			user,
		};
	}

	async signIn(signInDto: SignInDto) {
		const { email, tokenFirebase } = signInDto;

		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const passwordValid = await bcrypt.compare(
			tokenFirebase,
			user.tokenFirebase,
		);
		if (!passwordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = { userId: user.id, email: user.email };
		const token = await this.jwtService.sign(payload);

		const response = {
			message: 'User logged in successfully',
			user: user,
			token,
		};

		return response;
	}
}
