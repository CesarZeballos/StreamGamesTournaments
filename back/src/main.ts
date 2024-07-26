import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Habilitar CORS
	app.enableCors({
		origin: 'http://localhost:3000', // Reemplaza esto con el origen de tu frontend
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


	await app.listen(3001);
}
bootstrap();
