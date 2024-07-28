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

export interface ILoginError {
    email?: string
    password?: string
}