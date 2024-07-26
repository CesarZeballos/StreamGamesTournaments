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
	) { }

	async signUp(createUserDto: CreateUserDto) {
		const { email, nickName, password, birthDate, teamId } = createUserDto;

		const userExists = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userExists) {
			throw new BadRequestException('User already exists');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const parsedBirthDate = new Date(birthDate);

		const user = await this.prisma.user.create({
			data: {
				email,
				nickName,
				password: hashedPassword,
				birthDate: parsedBirthDate.toISOString(),
				team: teamId
					? {
						connect: { id: teamId },
					}
					: undefined,
			},
		});

		return {
			message: 'User created successfully',
			user,
		};
	}

	async signIn(signInDto: SignInDto) {
		const { email, password } = signInDto;

		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = { userId: user.id, email: user.email };
		const token = this.jwtService.sign(payload);

		return {
			message: 'User logged in successfully',
			user: user,
			token,
		};
	}
}
