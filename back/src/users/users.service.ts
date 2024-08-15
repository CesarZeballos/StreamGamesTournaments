import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Tournament, User, UserFriends } from '@prisma/client';
import { UpdateUserDto } from 'auth/dto/auth.user.Dto';
import { Fetchs } from 'utils/fetch.cb';

@Injectable()
export class UsersService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fetchs: Fetchs
	) { }

	async getAllUsers(): Promise<any[]> { // Cambié el tipo de retorno a any[] para reflejar la nueva estructura
		const usersData = await this.prisma.user.findMany({
		  include: {
			teams: {
			  include: {
				team: {
				  include: {
					tournament: {
					  include: {
						game: true,
					  },
					},
				  },
				},
			  },
			},
			tournaments: true,
			
		  },
		});
	  
		if (usersData.length === 0) {
		  throw new BadRequestException('No users found');
		}
	  
		const result = usersData.map(user => {
		  const playerTournaments = user.tournaments.map(tournament => ({
			tournamentId: tournament.id,
			id: user.id,
			nameTournament: tournament.nameTournament,
			nameTeam: null,
			tournamentDate: tournament.startDate.toISOString(),
			state: tournament.state,
		  }));
	  
		  const teamTournaments = user.teams.map(team => ({
			tournamentId: team.team.tournament.id,
			id: user.id,
			nameTournament: team.team.tournament.nameTournament,
			nameTeam: team.nameTeam,
			tournamentDate: team.team.tournament.startDate.toISOString(),
			state: team.team.tournament.state,
		  }));
	  
		  const combinedTournaments = [...playerTournaments, ...teamTournaments];
	  
		  return {
			id: user.id,
			email: user.email,
			nickname: user.nickname,
			tokenFirebase: user.tokenFirebase,
			birthdate: user.birthdate.toISOString(),
			urlProfile: user.urlProfile,
			urlStream: user.urlStream,
			role: user.role,
			createdAt: user.createdAt.toISOString(),
			state: user.state,
			tournaments: combinedTournaments,
		  };
		});
	  
		return result;
	  }

	async getUserById(id: string): Promise<
		Partial<User> & { tournaments: Tournament[] } & { friends: UserFriends[] }
	> {
		const userData = await this.fetchs.FindUserByUnique({ id });
		if (!userData) {
			throw new NotFoundException(`No user found with id ${id}`);
		}

		const singlePlayerTournaments = userData.tournaments;
		const teamsTournaments = userData.teams.map(
			(team) => team.team.tournament,
		);

		const userTournaments = [
			...singlePlayerTournaments,
			...teamsTournaments,
		];

		const { tokenFirebase, state, ...userNotData } = userData;

		return {
			...userNotData,
			tournaments: userTournaments,
			friends: userData.friends
		};
	}

	async getUserByEmail(email: string): Promise<User | null> {
		const user = await this.fetchs.FindUserByUnique({ email });
		if (!user) throw new NotFoundException(`No user found with email: ${email}`);
		return user;
	}

	async updateUser(id: string, data: UpdateUserDto): Promise<User> {
		const userData = await this.fetchs.FindUserByUnique({ id });
		if (!userData) throw new NotFoundException(`User does not exist`);

		return await this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async disableUser(id: string): Promise<User> {
		const userData = await this.fetchs.FindUserByUnique({ id });
		if (!userData) throw new NotFoundException(`User does not exist`);

		return await this.prisma.user.update({
			where: { id },
			data: {
				state: false
			}
		});
	}
}
