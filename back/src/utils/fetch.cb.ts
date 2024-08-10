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

type TournamentIdentifier = {
    nameTournament?: string;
    id?: string;
};

export class Fetchs {
    constructor(private readonly prisma: PrismaService) { }

    async FindUserByUnique(parameter: UserIdentifier) {
        const { email, nickname, id } = parameter
        return await this.prisma.user.findUnique({
            where: {
                ...(email && { email }),
                ...(nickname && { nickname }),
                ...(id && { id }),
            },
            include: {
                friends: {
                    include: {
                        friend: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                        user: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                    },
                },
                friendRequests: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                        friend: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                    },
                },
                sentFriendRequests: {
                    include: {
                        receiver: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                    },
                },
                receivedFriendRequests: {
                    include: {
                        sender: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                    },
                },
                sentMessages: {
                    include: {
                        receiver: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                    },
                },
                receivedMessages: {
                    include: {
                        sender: {
                            select: {
                                id: true,
                                nickname: true,
                                email: true,
                                urlProfile: true,
                            },
                        },
                    },
                },
                globalChat: true,
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
                tournaments: {
                    include: {
                        game: true,
                        teams: {
                            include: {
                                users: true,
                            },
                        },
                    },
                },
                organizedTournaments: {
                    include: {
                        game: true,
                        teams: {
                            include: {
                                users: true,
                            },
                        },
                    },
                },
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

    async FindTournamentByUnique(parameter: TournamentIdentifier) {
        const { nameTournament, id } = parameter
        return this.prisma.tournament.findUnique({
            where: {
                ...(nameTournament && { nameTournament }),
                ...(id && { id })
            },
            include: {
                game: true,
                players: {
                    include: {
                        friends: true,
                        friendRequests: true,
                        sentFriendRequests: true,
                        receivedFriendRequests: true,
                        sentMessages: true,
                        receivedMessages: true,
                        globalChat: true,
                        teams: {
                            include: {
                                team: {
                                    include: {
                                        users: true,
                                        tournament: true,
                                        versusPosition1: true,
                                        versusPosition2: true,
                                    },
                                },
                            },
                        },
                        tournaments: true,
                        organizedTournaments: true,
                        notifications: true,
                    },
                },
                organizer: true,
                teams: {
                    include: {
                        users: {
                            include: {
                                user: true,
                            },
                        },
                        versusPosition1: {
                            include: {
                                team2: true,
                                tournament: true,
                            },
                        },
                        versusPosition2: {
                            include: {
                                team1: true,
                                tournament: true,
                            },
                        },
                    },
                },
                versus: {
                    include: {
                        team1: true,
                        team2: true,
                        positionBattle: {
                            include: {
                                tournament: true,
                                versus: true,
                            },
                        },
                    },
                },
                notifications: {
                    include: {
                        receivedNotification: true,
                    },
                },
                positionBattle: {
                    include: {
                        versus: {
                            include: {
                                team1: true,
                                team2: true,
                                tournament: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async FindGamesByUnique(parameter: GameTeamIdentifier) {
        const { name, id } = parameter;
        return this.prisma.game.findUnique({
            where: {
                ...(name && { name }),
                ...(id && { id }),
            },
        });
    }


    async FindTeamByUnique(parameter: GameTeamIdentifier) {
        const { name, id } = parameter
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
