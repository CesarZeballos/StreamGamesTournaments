export interface IUser {
    id: string
    email: string
    nickname: string
    // tokenFirebase: string
    birthdate: string
    urlProfile: string
    urlSteam: string
    role: string
    state: boolean
    teams: ITeam[]
    tournaments: ITournamentsregistered[]
    friends: []
    sentFriendRequests: []
    sentMessages: []
    receivedMessages: []
    globalChat: []
}

export interface ITeam {
    id: string
    name: string
    members: IUser[]
}

export interface ITournamentsregistered {
    id: string
    nameTournament: string
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
    birthDate: string
    role: string
}