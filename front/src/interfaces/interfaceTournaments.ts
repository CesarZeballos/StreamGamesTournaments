import { StaticImageData } from "next/image";
import { IUser } from "./interfaceUser";

export interface ITournament {
    id: string;
    nameTournament: string;
    startDate: string;
    createdAt: string;
    category: string;
    organizerId: string;
    gameId: string;
    membersNumber: number;
    maxTeam: number;
    price: number;
    urlAvatar: string;
    awards: string[];
    description: string;
    state: boolean;
    game: IGame;
    players: [];
    organizer: IUser;
}

export interface IGame {
    id: string;
    name: string;
    urlImage: string;
    state: boolean
}

//interface para el form de agregar equipo
export interface IAddTeam {
    tournamentId: string
    teamName: string
    organizarId: string
    members: IUser[]
}

//interface para mostrar mis torneos en el dashboard user
export interface IMyTournaments {
    id: string
    nameTournament: string
    startDate: string
    status: string
}