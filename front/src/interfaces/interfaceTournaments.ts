import { StaticImageData } from "next/image";

export interface ITournament {
    id: number | string,
    players: number
    nameTournament: string;
    description: string;
    games: StaticImageData | null;
    startDate: string,
    categories: string,
    award: number,
    price: number,
    membersNumber: number
    urlStream: string,
    organizerId: string,
    gameId: string,
}

export interface IAddTeam {
    tournamentId: string
    teamId: string
    payment: string
}