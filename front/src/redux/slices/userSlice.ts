import { ILoginPayload, ILoginState, IRegisterPayload } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILoginState = {
    token: "",
    userName: "",
    // rol: "",
    // tournament: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<ILoginPayload>) {
            const { email, password } = action.payload;

            try {
                console.log("login redux", email, password)
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
                    //router
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export const { login, register } = userSlice.actions;
export default userSlice.reducer;