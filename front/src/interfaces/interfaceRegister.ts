export interface IRegisterForm {
    nickname: string;
    email: string;
    password: string;
    birthdate: string;
}

export interface IRegisterError {
    nickname?: string;
    email?: string;
    password?: string;
    birthdate?: string;
}