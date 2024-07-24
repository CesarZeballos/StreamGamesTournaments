import { ILoginPayload, ILoginState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILoginState = {
    token: "",
    userName: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<ILoginPayload>) {
            const { email, password } = action.payload;
            console.log(email)
            console.log(password)
        }
    }
})

export const { login } = userSlice.actions;
export default userSlice.reducer;