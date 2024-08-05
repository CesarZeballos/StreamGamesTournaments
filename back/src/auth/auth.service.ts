import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, SignInDto } from './auth.user.Dto';
import { MailService } from 'mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { MailTemplates } from 'mail/mail-templates';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService,
	) { }

	async signUp(createUserDto: CreateUserDto) {
		const { email, nickname, tokenFirebase, birthdate } = createUserDto;

		const userExists = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (userExists) {
			if (userExists.isBanned === true) throw new BadRequestException(`User with email: ${userExists.email} is banned`)
			if (userExists.state === true && userExists.isBanned === false) throw new BadRequestException(`User with email: ${userExists.email} already exists`)
		}

		const parsedBirthDate = new Date(birthdate);

		const user = await this.prisma.user.create({
			data: {
				email,
				nickname,
				tokenFirebase,
				birthdate: parsedBirthDate.toISOString(),
			},
		});

		// Generar el token JWT
		const payload = { userId: user.id, email: user.email };
		const token = await this.jwtService.sign(payload);

		// Enviar correo de bienvenida
		const mailOptions = MailTemplates.welcomeEmail(email, nickname);
		try {
			await this.mailService.sendMail(mailOptions);
			this.logger.log(`Welcome email sent to ${email}`);
		} catch (error) {
			this.logger.error(
				`Failed to send welcome email to ${email}`,
				error.stack,
			);
			throw new InternalServerErrorException(
				'Error sending welcome email',
			);
		}

		return {
			message: 'User created successfully',
			user,
			token, // Incluir el token en la respuesta
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

			this.logger.log(`User signed in successfully with email: ${email}`);

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
