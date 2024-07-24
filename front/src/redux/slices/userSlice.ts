import { ILoginPayload, ILoginState } from "@/interfaces/interfaceRedux";
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
                console.log("redux", email, password)
            } catch (error) {
                console.log(error)
            }
        }
    }
})

export const { login } = userSlice.actions;
export default userSlice.reducer;