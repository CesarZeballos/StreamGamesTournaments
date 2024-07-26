import { StaticImageData } from "next/image";

export interface ITournament {
    players: number
    id: number | string,
    name: string;
    description: string;
    games: StaticImageData | null;
    startDate: string,
    categories: string,
    award: number,
    urlStream: string,
    organizerId: string,
    gameId: string,
}

export interface ITournamentRegister {
    tournamentId: string
    teamId: string
    payment: string
}