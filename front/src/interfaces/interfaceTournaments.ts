import { StaticImageData } from "next/image";
import { IUser } from "./interfaceUser";

type ImageSource = StaticImageData | string;

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

export interface ITournamentPost {
    nameTournament: string;
    startDate: string;
    category: string;
    organizerId: string;
    gameId: string;
    membersNumber: number;
    maxTeam: number;
    price: number;
    urlAvatar: File | string;
    award: string[];
    description: string;
}

export interface ITournamentPostError {
    nameTournament: string;
    startDate: string;
    category: string;
    organizerId: string;
    gameId: string;
    membersNumber: string;
    maxTeam: string;
    price: string;
    urlAvatar: string;
    award: string;
    description: string;
}

export interface ITournamentState {
    tournaments: ITournament[];
    filter: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface IGame {
    id: string;
    name: string;
    urlImage: string;
    description?: string;
}

export interface IGamePost {
    name: string;
    urlImage: File | string;
    description: string;
}

export interface IGamePostError {
    name: string;
    urlImage: string;
    description: string;
}

//interface para el form de agregar equipo
export interface IAddTeam {
    tournamentId: string
    name: string
    organizerId: string
    token: string
    users: string[]
}

//interface para mostrar mis torneos en el dashboard user
export interface ITournamentsInscripted {
    id: string
    nameTournament: string
    teamName: string
    tournamentDate: string
    status: string
}
