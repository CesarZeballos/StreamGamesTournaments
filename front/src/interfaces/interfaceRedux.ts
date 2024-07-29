import { IUser } from "./interfaceUser";
import { ITournament } from "@/interfaces/interfaceTournaments";

export interface ITournamentState {
  tournaments: ITournament[];
}

export interface IUserState {
    user: IUser | null;
    status: string;
    error: string | null;
    token: string | null;
    statusRegister: string;
}

export interface IRegisterFormSlice {
    nickName: string;
    email: string;
    password: string;
    birthDate: string;
}