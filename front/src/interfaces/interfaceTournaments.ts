import { StaticImageData } from "next/image";
import { IUser } from "./interfaceUser";
<<<<<<< HEAD

type ImageSource = StaticImageData | string;
=======
>>>>>>> origin/cesar

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
    urlAvatar: ImageSource;
    award: string[];
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
    state: boolean
}

//interface para el form de agregar equipo
export interface IAddTeam {
    tournamentId: string
<<<<<<< HEAD
    name: string
    organizerId: string
    users: string[]
}

//interface para mostrar mis torneos en el dashboard user
export interface IMyTournaments {
    id: string
    nameTournament: string
    startDate: string
    status: string
=======
    teamName: string
    organizarId: string
    members: IUser[]
>>>>>>> origin/cesar
}