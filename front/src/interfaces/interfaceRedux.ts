import { ITournament } from "./interfaceTournaments";
import { IUser } from "./interfaceUser";

export interface IUserState {
    user: IUser | null;
    status: string;
    error: string | null;
}