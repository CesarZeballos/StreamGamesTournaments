export interface IUser {
    id: string
    nickName: string
    email: string
    birthDate: string
    role: string
    teams: ITeam[]
}

export interface ITeam {
    id: string
    name: string
    members: ITeamMember[]
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

export interface ILoginError {
    email?: string
    password?: string
}