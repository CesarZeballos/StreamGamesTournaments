import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { preloadData } from '../preload/preload.db';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const prismaService = app.get(PrismaService);

	try {
		app.use(bodyParser.json({ limit: '10mb' }));
		app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

		app.useWebSocketAdapter(new IoAdapter(app));

		app.enableCors({
			origin: '*',
			methods: 'GET,POST,PUT,DELETE,PATCH',
			allowedHeaders: 'Content-Type,Authorization',
		});

		const options = new DocumentBuilder()
			.setTitle('Stream Games Tournaments Api')
			.setDescription('Api para manejar Stream Games Tournaments')
			.setVersion('1.0')
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('api', app, document);

		app.use(LoggerGlobalMiddleware);
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		const port = process.env.PORT || 3001;
		await app.listen(port, '0.0.0.0', () => {
			console.log(`App listening on port ${port}`);
		});

		async function PreloadData(prismaService: PrismaService) {
			const preload = new preloadData(prismaService);
			await preload.clearTables();
			await preload.addGames();
			await preload.addUsers();
			await preload.addTournaments();
		}

		await PreloadData(prismaService);
		console.log('Data preloaded successfully');
	} catch (error) {
		console.error('Error preloading data:', error);
	} finally {
		await prismaService.$disconnect();
	}
}

bootstrap();
