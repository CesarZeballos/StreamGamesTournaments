import { ILoginPayload, ILoginState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILoginState = {
    token: "",
    userName: "",
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login(state, action: PayloadAction<ILoginPayload>) {
            const { email, password } = action.payload;
            console.log(email)
            console.log(password)
        }
    }
})

export const { login } = loginSlice.actions;
export default loginSlice.reducer;