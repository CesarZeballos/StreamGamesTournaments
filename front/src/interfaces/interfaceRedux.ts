import { IUser } from "./interfaceUser";
import { ITournament } from "@/interfaces/interfaceTournaments";

export interface ITournamentState {
  tournaments: ITournament[];
}

export interface IStatus {
  access: string;
  register: string;
  forgotPassword: string;
  team: string;
  teamTournament: string;
}

export interface IUserState {
    user: IUser | null;
    status: IStatus;
    error: string | null;
    token: string | null
}

export interface IRegisterFormSlice {
    nickName: string;
    email: string;
    password: string;
    birthDate: string;
}