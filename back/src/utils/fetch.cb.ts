import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

type UserIdentifier = {
    email?: string;
    nickname?: string;
    id?: string;
};

type GameTeamIdentifier = {
    name?: string;
    id?: string;
};


@Injectable()
export class Fetchs {
    constructor(private readonly prisma: PrismaService) { }

    async FindUserByUnique(parameter: UserIdentifier) {
        const { email, nickname, id } = parameter
        if (!email && !nickname && !id) {
            throw new Error('At least one identifier must be provided');
        }

        return await this.prisma.user.findUnique({
            where: {
                ...(email && { email }),
                ...(nickname && { nickname }),
                ...(id && { id }),
            },
            include: {
                friends: {
                    include: {
                        friend: true,
                        user: true,
                    },
                },
                friendRequests: {
                    include: {
                        user: true,
                        friend: true,
                    },
                },
                sentFriendRequests: {
                    include: {
                        receiver: true,
                    },
                },
                receivedFriendRequests: {
                    include: {
                        sender: true,
                    },
                },
                sentMessages: {
                    include: {
                        receiver: true,
                    },
                },
                receivedMessages: {
                    include: {
                        sender: true,
                    },
                },
                globalChat: true,
                teams: {
                    include: {
                        team: {
                            include: {
                                tournament: { include: { game: true } }
                            },
                        },
                    },
                },
                tournaments: {
                    include: {
                        game: true,
                        teams: {
                            include: {
                                tournament: true,
                                users: true,
                            },
                        },
                    },
                },
                organizedTournaments: true,
                notifications: {
                    include: {
                        tournament: {
                            include: {
                                game: true,

                                teams: {
                                    include: {
                                        users: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

    }

    async FindTournamentByUnique(id: string) {
        if (!id) {
            throw new Error('Tournament ID must be provided');
        }

        try {
            const tournament = await this.prisma.tournament.findUnique({
                where: { id },
                include: {
                    game: true,
                    players: true,
                    organizer: { include: { teams: { include: { user: true } } } },
                    teams: { include: { users: true } },
                    versus: {include:{team1:true,team2:true}},
                    notifications: true,
                    positionBattle: true,
                },
            });


            if (!tournament) {
                throw new Error('Tournament not found');
            }

            return tournament;
        } catch (error) {
            throw error;
        }
    }




    async FindGamesByUnique(parameter: GameTeamIdentifier) {
        const { name, id } = parameter;
        if (!name && !id) {
            throw new Error('At least one identifier must be provided');
        }

        return this.prisma.game.findUnique({
            where: {
                ...(name && { name }),
                ...(id && { id }),
            },
        });
    }


    async FindTeamByUnique(parameter: GameTeamIdentifier) {

        const { name, id } = parameter
        if (!name && !id) {
            throw new Error('At least one identifier must be provided');
        }

        return this.prisma.team.findUnique({
            where: {
                ...(name && { name }),
                ...(id && { id }),
            },
            include: {
                users: {
                    include: {
                        user: true
                    }
                },
                tournament: true,
                versusPosition1: true,
                versusPosition2: true,
            },
        });
    }
}
