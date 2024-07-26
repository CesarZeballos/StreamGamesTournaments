

export interface ITournament {
    _id: string
    name: string
    description: string
    date: string
    image: string
    players: number
}

export interface ITournamentRegister {
    tournamentId: string
    teamId: string
    payment: string
}