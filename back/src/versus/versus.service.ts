// import { BadRequestException, Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
// import { CreateVersusDto } from './versus.dto';
// import { Round } from '@prisma/client';

// @Injectable()
// export class VersusService {
//     constructor(private readonly prisma: PrismaService) { }

//     async createVersus(tournamentId: string) {

//         const tournament = await this.prisma.tournament.findUnique({ where: { id: tournamentId }, include: { teams: true } })
//         if (!tournament) throw new BadRequestException('Tournament does not exists')

//         const teams = tournament.teams
//         const round = ''
//         if (teams.length < 2) round = Round.FINAL
//         if (teams.length < 4) Round.SEMIFINAL
//         if (teams.length < 8) Round.QUARTER_FINAL
//         if (teams.length < 16) Round.ROUND_OF_16
//         if (teams.length === 16)
//             for (const team of teams) {
//                 await this.prisma.team.findUnique({ where: { id: team.id }, include: { users: true } })
//                 if (!team) throw new BadRequestException('Team does not exists')
//             }
//         let count = 0
//         let i = 0
//         const battles = {}
//         while (i < teams.length) {
//             battles = await this.prisma.versus.create({
//                 data: {
//                     tournament: { connect: { id: tournamentId } },
//                     team1: { connect: { id: teams[count].id } },
//                     team2: { connect: { id: teams[count + 1].id } },
//                     round: Round
//                 }
//             })
//         }



//     }
// }
