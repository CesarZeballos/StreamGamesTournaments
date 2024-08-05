import { IUser } from "./interfaceUser";
import { IAddTeam, ITournament } from "@/interfaces/interfaceTournaments";

export interface ITournamentState {
  status: string;
  tournaments: ITournament[];
  currentPage: number;
  filters: IFilters;
  tournamentsFiltered: ITournament[];
}

export interface IFilters {
  game: string;
  category: string;
  price: string;
  date: string;
}

export interface IFiltersProp {
  name: filterEmun;
  value: string;
}

export const enum filterEmun {
  game = "game",
  category = "category",
  price = "price",
  date = "date"
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
  statusPayment: string
}

export interface IAddTeamToTournament {
    teamData: IAddTeam
    orderId?: string
    token: string
}