export interface ILoginState {
    token: string;
    userName: string;
}

export interface ILoginPayload {
    email: string;
    password: string;
}