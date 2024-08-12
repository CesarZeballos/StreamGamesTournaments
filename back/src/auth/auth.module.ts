import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { MailModule } from '../mail/mail.module'; // Importa el MailModule
import { Fetchs } from 'utils/fetch.cb';

@Module({
	imports: [
		PrismaModule,
		ConfigModule.forRoot(),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1h' },
			}),
			inject: [ConfigService],
		}),
		MailModule,
	],
	providers: [AuthService, PrismaService, Fetchs],
	controllers: [AuthController],
})
export class AuthModule { }