export interface IUser {
    id: string;
    email: string;
    nickName: string;
    birthDate: string;
    role: string;
    tournaments: ITournamentsregistered[];
}

export interface IUserFilters {
    nickName: string;
    inTournament: string;
    role: string;
}

export interface ITeam {
    id: string
    name: string
    members: ITeamMember[]
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