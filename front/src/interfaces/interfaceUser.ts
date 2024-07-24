export interface IUser {
    id: string
    nickname: string
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
    nickname: string
}