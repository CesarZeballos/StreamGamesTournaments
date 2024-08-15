import { IOrganizerTournament, ITournament } from "./interfaceTournaments"

export interface IUser {
    tournaments: []
    id: string
    email: string
    nickname: string
    tokenFirebase: string
    birthdate: string
    urlProfile: string
    urlSteam: string
    role: string
    state: boolean
    organizerTournaments: IOrganizerTournament[]
    friends: IFriend[]
    receivedFriendRequests: IFriendRequest[]
    sentMessages: []
    notifications: ITournamentsRegistered[]
    receivedMessages: []
    globalChat: []
}

export interface IFriendRequest {
    id: string
    nickname: string
}

export interface IFriendRequestProps {
    id: string
    token: string
}

export interface IUserFilters {
    nickname: string;
    role: string;
    tournaments: string;
    state: 'all' | 'active' | 'inactive';
}

export interface IFriend {
    id: string
    nickname: string
    friendId: string
}

export interface ITeam {
    id: string
    name: string
    members: IUser[]
}

export interface ITournamentsRegistered {
    tournamentId: string
    id: string
    nameTournament: string
    nameTeam: string
    nameGame: string
    tournamentDate: string
    state: boolean
}

//register
export interface IRegisterForm {
    nickname: string;
    email: string;
    password: string;
    birthdate: string;
    tokenFirebase?: string
}

export interface IRegisterError {
    nickname?: string;
    email?: string;
    password?: string;
    birthdate?: string;
}

//login
export interface ILoginForm {
    email: string
    password: string
    tokenFirebase?: string
}

export interface ILoginDataBase {
    email: string,
    tokenFirebase?: string
}

export interface ILoginError {
    email?: string
    password?: string
}

//addfriends

export interface IUserSelector {
    id: string
    label: string
    email: string
    birthdate: string
    role: string
}

export interface IAddFriendForm {
    userId: string
    friendId: string
    token: string
}

export interface IFriendRequest {
    requestId: string,
    token: string
}

//ugrade user

export interface IUpgradeUser {
    id: string
    token: string
}

export interface IDeletetournament {
    id: string
    token: string
}

export interface IChangesData {
    birthdate: string
    nickname: string
}

export interface IChangesErrors {
    birthdate?: string
    nickname?: string
}


export interface IRoleSelectorDashboard {
    id: number
    name: string
}
