import { ILoginPayload, IRegisterPayload, IUserState } from "@/interfaces/interfaceRedux";
import { IUser } from "@/interfaces/interfaceUser";
import { loginUser } from "@/utils/fetchUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
    id: "",
    nickname: "",
    email: "",
    birthdate: "",
    role: "",
    teams: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            const { id, nickname, email, birthdate, role, teams } = action.payload;
            state.id = id
            state.nickname = nickname
            state.email = email
            state.birthdate = birthdate
            state.role = role
            state.teams = teams
        },

        login(state, action: PayloadAction<ILoginPayload>) {
            const { email, password } = action.payload;
            try {
                console.log("login redux", email, password)
                const dataLogin = loginUser({ email, password })
                // setUser({dataLogin})
                // router...
            } catch (error) {
                console.log(error)
            }
        },

        register(state, action: PayloadAction<IRegisterPayload>) {
            const { nickname, email, password, birthdate } = action.payload;
            
            try {
                console.log("register redux", nickname, email, password, birthdate)
                setTimeout(() => {
                    login({ email, password })
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export const { login, register } = userSlice.actions;
export default userSlice.reducer;