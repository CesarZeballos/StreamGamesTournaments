import { StaticImageData } from "next/image";

type ImageSource = StaticImageData | string;

export interface ITournament {
    id: string;
    nameTournament: string;
    startDate: string;
    createdAt: string;
    price: number;
    category: string;
    gameId: string;
    membersNumber: number;
    award: string[];
    urlAvatar: string;
    description: string;
    maxTeam: number;
    organizerId: string;
    game: {
        id: string;
        name: string;
        urlImage: string;
    };
}

export interface ITournamentPost {
    startDate: string;
    categories: string;
    price: number;
    award: string[];
    urlStream: string | ImageSource;
    membersNumber: number;
    maxTeam: number;
    organizerId: string;
    gameId: string;
}

export interface IAddTeam {
    tournamentId: string
    teamId: string
    payment: string
}