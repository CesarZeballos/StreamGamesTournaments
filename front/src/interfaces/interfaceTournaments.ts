import { StaticImageData } from "next/image";
import { IUser } from "./interfaceUser";

export interface ITournament {
    id: string;
    nameTournament: string;
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
    teamName: string
    members: string[]
}