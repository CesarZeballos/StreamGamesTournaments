import { ITournament } from "./interfaceTournaments";
import { IUser } from "./interfaceUser";

export interface IUserState {
    data: IUser;
}
export interface IRegisterState {
    nickname: string;
    email: string;
    teams: string[];
    birthdate: string;
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