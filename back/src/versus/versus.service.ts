import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Round } from '@prisma/client';
import { Fetchs } from 'utils/fetch.cb';

@Injectable()
export class VersusService {
    constructor(private readonly prisma: PrismaService,
        private readonly fetchs: Fetchs
    ) { }

    async createVersus(tournamentId: string) {
        const tournament = await this.fetchs.FindTournamentByUnique(tournamentId)

        if (!tournament) throw new BadRequestException('Tournament does not exist');

        if (tournament.versus.length === 0) {

            await this.createFirstRound(tournament);
        } else {

            await this.createNextRound(tournament);
        }
    }


    async createFirstRound(tournament: any) {
        const teams = tournament.teams;
        const firstRound = this.determineRoundName(tournament.maxTeams);


        let positionId: string | null = tournament.positionBattle.id || null;

        if (!positionId) {
            const position = await this.prisma.positionsBattle.create({
                data: {
                    round: firstRound,
                    tournament: { connect: { id: tournament.id } },
                },
            });
            positionId = position.id;
        }

        for (let i = 0; i < teams.length; i += 2) {
            await this.prisma.versus.create({
                data: {
                    tournament: { connect: { id: tournament.id } },
                    team1: { connect: { id: teams[i].id } },
                    team2: { connect: { id: teams[i + 1]?.id || null } },
                    round: firstRound,
                    positionBattle: { connect: { id: positionId } },
                },
            });
        }
    }


    async createNextRound(tournament: any) {
        const lastRound = this.getLastRound(tournament);
        const teamsInLastRound = this.getWinningTeamsFromLastRound(tournament, lastRound);

        if (lastRound === Round.SEMIFINAL) {

            await this.createThirdPlaceBattle(tournament, teamsInLastRound);

            await this.createFinalRound(tournament, teamsInLastRound);
        } else {

            const nextRound = this.getNextRoundName(lastRound);
            await this.createSubsequentRound(tournament, teamsInLastRound, nextRound);
        }
    }

    async createThirdPlaceBattle(tournament: any, teams: string[]) {
        const [loser1, loser2] = teams;

        await this.prisma.versus.create({
            data: {
                tournament: { connect: { id: tournament.id } },
                team1: { connect: { id: loser1 } },
                team2: { connect: { id: loser2 } },
                round: Round.THIRD_PLACE,
            },
        });
    }

    async createFinalRound(tournament: any, teams: string[]) {
        await this.prisma.versus.create({
            data: {
                tournament: { connect: { id: tournament.id } },
                team1: { connect: { id: teams[0] } },
                team2: { connect: { id: teams[1] } },
                round: Round.FINAL,
            },
        });

    }

    async createSubsequentRound(tournament: any, teams: string[], round: Round) {
        let positionId: string | null = tournament.positionBattle.id || null;

        if (!positionId) {
            const position = await this.prisma.positionsBattle.create({
                data: {
                    round: round,
                    tournament: { connect: { id: tournament.id } },
                },
            });
            positionId = position.id;
        }

        for (let i = 0; i < teams.length; i += 2) {
            await this.prisma.versus.create({
                data: {
                    tournament: { connect: { id: tournament.id } },
                    team1: { connect: { id: teams[i] } },
                    team2: { connect: { id: teams[i + 1] || null } },
                    round: round,
                    positionBattle: { connect: { id: positionId } },
                },
            });
        }
    }

    determineRoundName(maxTeams: number): Round {
        switch (maxTeams) {
            case 2:
                return Round.FINAL;
            case 4:
                return Round.SEMIFINAL;
            case 8:
                return Round.QUARTER_FINAL;
            case 16:
                return Round.ROUND_OF_16;
            default:
                return Round.FIRST_ROUND;
        }
    }

    getLastRound(tournament: any): Round {
        return tournament.versus.reduce((max, versus) => max > versus.round ? max : versus.round, Round.FIRST_ROUND);
    }

    getWinningTeamsFromLastRound(tournament: any, lastRound: Round): string[] {
        return tournament.versus
            .filter(versus => versus.round === lastRound)
            .map(versus => versus.winnerId)
            .filter(Boolean);
    }

    getNextRoundName(lastRound: Round): Round {
        const rounds = [Round.FIRST_ROUND, Round.ROUND_OF_16, Round.QUARTER_FINAL, Round.SEMIFINAL, Round.FINAL, Round.THIRD_PLACE];
        const currentIndex = rounds.indexOf(lastRound);
        return rounds[currentIndex + 1] || Round.FINAL;
    }

    async updateWinnerRound(winnerId: string, versusId: string) {
        const versusData = await this.prisma.versus.findUnique({ where: { id: versusId } })

        if (!versusData) throw new BadRequestException('Battle does not exist');

        const versus = await this.prisma.versus.update({
            where: {
                id: versusData.id
            },
            data: { winnerId }
        })

        return versus
    }
}

