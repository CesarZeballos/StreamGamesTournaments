import { ITournament } from "./interfaceTournaments";

export interface ILoginState {
    token: string;
    userName: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRegisterPayload {
    nickname: string;
    email: string;
    password: string;
    birthdate: string;
}

export interface ITournamentState {
    tuornaments: ITournament[];
}