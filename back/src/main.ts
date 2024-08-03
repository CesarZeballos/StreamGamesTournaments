import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const prismaService = app.get(PrismaService);

	try {
		app.enableCors({
			origin: '*',
			methods: 'GET,POST,PUT,DELETE',
			allowedHeaders: 'Content-Type,Authorization',
		});

		const options = new DocumentBuilder()
			.setTitle('NestJs Api')
			.setDescription('Stream Games Tournaments Api')
			.setVersion('1.0.0')
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('api', app, document);

		app.use(LoggerGlobalMiddleware);
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

		const port = process.env.PORT || 3001;
		await app.listen(port, () => {
			console.log(`App listening on port ${port}`);
		});
	} catch (error) {
		console.error('Error preloading data:', error);
	} finally {
		await prismaService.$disconnect();
	}
}

bootstrap();
