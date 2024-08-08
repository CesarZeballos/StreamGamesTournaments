import { ITournament } from "./interfaceTournaments"

export interface IUser {
    id: string
    email: string
    nickname: string
    tokenFirebase: string
    birthdate: string
    urlProfile: string
    urlSteam: string
    role: string
    state: boolean
    tournaments: ITournament[]
    friends: IFriend[]
    receivedFriendRequests: IFriendRequest[]
    sentMessages: []
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
    state: string;
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

export interface ITournamentsregistered {
    id: string
    nameTournament: string
    startDate: string
}

// export interface ITeamMember {
//     id: string
//     nickName: string
// }


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
