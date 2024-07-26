export interface IUser {
    id: string
    nickName: string
    email: string
    birthdate: string
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
    birthdate: string;
}

export interface IRegisterError {
    nickName?: string;
    email?: string;
    password?: string;
    birthdate?: string;
}

//login
export interface ILoginForm {
    email: string
    password: string
}

export interface ILoginError {
    email?: string
    password?: string
}