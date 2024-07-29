import { StaticImageData } from "next/image";

export interface ITournament {
    id: string;
    name: string;
    startDate: string;
    createdAt: string;
    price: number;
    categories: string;
    gameId: string;
    membersNumber: number;
    award: string[];
    urlAvatar: string;
    description: string;
    maxMember: number;
    maxTeam: number;
    organizerId: string;
    game: {
        id: string;
        name: string;
        urlImage: string;
    };
}

export interface IAddTeam {
    tournamentId: string
    teamId: string
    payment: string
}