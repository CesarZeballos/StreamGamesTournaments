import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Round, Versus } from '@prisma/client';

@Injectable()
export class VersusService {
    constructor(private readonly prisma: PrismaService) { }

    // Obtener todos los versus de un torneo
    async getAllVersus(tournamentId: string) {
        const tournament = await this.prisma.tournament.findUnique({
            where: { id: tournamentId },
            include: {
                versus: {
                    include: {
                        team1: {
                            select: {
                                name: true,
                                urlAvatar: true,
                            },
                        },
                        team2: {
                            select: {
                                name: true,
                                urlAvatar: true,
                            },
                        },
                    },
                    select: {
                        round: true,
                        winnerId: true,
                    },
                },
            },
        });

        if (!tournament) {
            throw new BadRequestException('Tournament does not exist');
        }

        const results = tournament.versus.map(vs => ({
            round: vs.round,
            winnerId: vs.winnerId,
            team1: {
                name: vs.team1.name,
                urlAvatar: vs.team1.urlAvatar,
            },
            team2: {
                name: vs.team2.name,
                urlAvatar: vs.team2.urlAvatar,
            },
        }));

        return results;
    }

    // Crear versus basado en la ronda
    async createVersus(tournamentId: string) {
        const tournament = await this.prisma.tournament.findUnique({
            where: { id: tournamentId },
            include: { teams: true, versus: true, positionBattle: true },
        });

        if (!tournament) throw new BadRequestException('Tournament does not exist');

        if (tournament.versus.length === 0) {
            // Es la primera ronda
            await this.createFirstRound(tournament);
        } else {
            // Crear la siguiente ronda
            await this.createNextRound(tournament);
        }
    }

    // Crear la primera ronda del torneo
    async createFirstRound(tournament: any) {
        const teams = tournament.teams;
        const firstRound = this.determineRoundName(tournament.maxTeams);

        // Check if positionBattle exists, if not create it
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
                    team2: { connect: { id: teams[i + 1]?.id || null } }, // En caso de un número impar de equipos
                    round: firstRound,
                    positionBattle: { connect: { id: positionId } },
                },
            });
        }
    }

    // Crear una ronda subsiguiente
    async createNextRound(tournament: any) {
        const lastRound = this.getLastRound(tournament);
        const teamsInLastRound = this.getWinningTeamsFromLastRound(tournament, lastRound);

        if (lastRound === Round.SEMIFINAL) {
            // Crear la batalla por el tercer puesto
            await this.createThirdPlaceBattle(tournament, teamsInLastRound);

            // Crear la ronda final
            await this.createFinalRound(tournament, teamsInLastRound);
        } else {
            // Crear una nueva ronda subsiguiente
            const nextRound = this.getNextRoundName(lastRound);
            await this.createSubsequentRound(tournament, teamsInLastRound, nextRound);
        }
    }


    // Crear la batalla por el tercer puesto
    async createThirdPlaceBattle(tournament: any, teams: string[]) {
        const [loser1, loser2] = teams; // Asumimos que hay dos equipos que perdieron en las semifinales

        await this.prisma.versus.create({
            data: {
                tournament: { connect: { id: tournament.id } },
                team1: { connect: { id: loser1 } },
                team2: { connect: { id: loser2 } },
                round: Round.THIRD_PLACE,
            },
        });
    }

    // Crear la ronda final del torneo
    async createFinalRound(tournament: any, teams: string[]) {
        await this.prisma.versus.create({
            data: {
                tournament: { connect: { id: tournament.id } },
                team1: { connect: { id: teams[0] } },
                team2: { connect: { id: teams[1] } },
                round: Round.FINAL,
            },
        });

        // Finaliza el torneo si es necesario
    }

    // Crear una ronda subsiguiente
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
                    team2: { connect: { id: teams[i + 1] || null } }, // En caso de número impar de equipos
                    round: round,
                    positionBattle: { connect: { id: positionId } },
                },
            });
        }
    }

    // Determinar el nombre de la ronda basado en el número de equipos
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

    // Obtener la última ronda creada
    getLastRound(tournament: any): Round {
        return tournament.versus.reduce((max, v) => max > v.round ? max : v.round, Round.FIRST_ROUND);
    }

    // Obtener los equipos ganadores de la última ronda
    getWinningTeamsFromLastRound(tournament: any, lastRound: Round): string[] {
        return tournament.versus
            .filter(v => v.round === lastRound)
            .map(v => v.winnerId)
            .filter(Boolean);
    }

    // Obtener el nombre de la siguiente ronda
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

