import { IUser } from "./interfaceUser";
import { ITournament } from "@/interfaces/interfaceTournaments";

export interface ITournamentState {
  status: string;
  tournaments: ITournament[];
  filter: string | number;
}

export interface IUserState {
  user: IUser | null;
  status: string;
  statusRegister: string;
  statusForgotPassword: string;
  statusAddFriend: string
  error: string | null;
  token: string | null;
}

export interface IRegisterFormSlice {
    nickname: string;
    email: string;
    password: string;
    birthdate: string;
}

export interface IAuxiliarState {
  users: IUser[];
  status: string;
  error: string | null;
}