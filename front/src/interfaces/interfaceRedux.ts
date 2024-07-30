import { IUser } from "./interfaceUser";
import { ITournament } from "@/interfaces/interfaceTournaments";

export interface ITournamentState {
  status: string;
  tournaments: ITournament[];
}

export interface IUserState {
  user: IUser | null;
  status: string;
  statusRegister: string;
  statusForgotPassword: string;
  error: string | null;
  token: string | null;
}

export interface IRegisterFormSlice {
    nickName: string;
    email: string;
    password: string;
    birthDate: string;
}