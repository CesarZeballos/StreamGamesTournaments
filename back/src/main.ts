import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamsService } from 'teams/teams.service';
import { TournamentsService } from 'tournaments/tournaments.service';
import { preloadData } from '../preload/preload.db';

async function PreloadData(
	prismaService: PrismaService,
	teamService: TeamsService,
	tournamentsService: TournamentsService,
) {
	const preload = new preloadData(prismaService, teamService, tournamentsService);
	await preload.clearTables();
	await preload.addGames();
	await preload.addUsers();
	await preload.addTournaments();
	await preload.addTeamsWithPlayers();
	await preload.addTeamForTournament();
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const prismaService = app.get(PrismaService);
	const teamService = app.get(TeamsService);
	const tournamentService = app.get(TournamentsService);

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

		await PreloadData(prismaService, teamService, tournamentService);
		console.log('Data preloaded successfully');

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
