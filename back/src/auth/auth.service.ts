import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, SignInDto } from './auth.user.Dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
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

		try {
			this.logger.log(`Attempting to sign in user with email: ${email}`);

			const user = await this.prisma.user.findUnique({
				where: { email },
			});

			if (!user) {
				this.logger.warn(`User not found with email: ${email}`);
				throw new UnauthorizedException('Invalid credentials');
			}

			const payload = { userId: user.id, email: user.email };
			const token = await this.jwtService.sign(payload);

			this.logger.log(`ser signed in successfully with email: ${email}`);

			return {
				message: 'User logged in successfully',
				user,
				token,
			};
		} catch (error) {
			if (error instanceof UnauthorizedException) {
				throw error;
			}
			this.logger.error(
				`Error during sign-in process for email: ${email}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				'An error occurred during sign-in',
			);
		}
	}
}
