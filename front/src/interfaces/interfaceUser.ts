export interface IUser {
    id: string
    nickName: string
    email: string
    birthDate: string
    role: string
    teams: ITeam[]
    tournaments: ITournamentsregistered[]
}

export interface ITeam {
    id: string
    name: string
    members: ITeamMember[]
}

export interface ITeamForm {
    name: string
    members: ITeamMember[]
}

export interface ITeamError {
    name?: string
    members?: string
}

export interface ITournamentsregistered {
    id: string
    nameTournament: string
}

export interface ITeamMember {
    id: string
    nickName: string
}


//register
export interface IRegisterForm {
    nickName: string;
    email: string;
    password: string;
    birthDate: string;
    tokenFirebase?: string
}

export interface IRegisterError {
    nickName?: string;
    email?: string;
    password?: string;
    birthDate?: string;
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