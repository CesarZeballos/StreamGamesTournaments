import { IUser } from "./interfaceUser";
import { IAddTeam, IGame, ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";

export interface ITournamentState {
  status: string;
  tournaments: ITournament[];
  tournamentsActives: ITournament[]
  currentPage: number;
  tournamentsPerPage: number;
  filters: IFilters;
  tournamentsFiltered: ITournament[];
  games: IGame[]
  allGames: IGame[]
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
  statusPayment: string;
}

export interface IPaymentState {
  status: string
  error: string | null
  step: string
  teamData: IAddTeam
  tournamentData: ITournament
}

export interface IBasicDataToTournamentRegister {
  organizerId: string
  token: string
}

export interface ITeamDataToTournamentRegister {
  name: string
  users: string[]
}

export interface ITournamentPayment {
    tournamentId: string
    orderId?: string
    token: string
}

export interface IUserActionsState {
  addFriendStatus: string
  removeFriendStatus: string
  error: string | null
}

export interface IOrganizerState {
  step: string
  tournament: ITournamentPost
  token: string
}

export interface IBasicTournamentFormProps {
  organizerId: string;
  token: string;
}

export interface IFirstStep {
  nameTournament: string;
  startDate: string;
  category: string;
  gameId: string;
  urlAvatar: string;
}

export interface ISecondStep {
  membersNumber: number;
  maxTeam: number;
  price: number;
  award: string[];
  description: string;
}

export interface IThirdStep {
  urlAvatar: string;
}

