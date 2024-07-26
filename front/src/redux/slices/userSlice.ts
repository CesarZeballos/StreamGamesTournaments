import { IUserState } from "@/interfaces/interfaceRedux";
import { IUser } from "@/interfaces/interfaceUser";
import { loginUser } from "@/utils/fetchUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerSlice } from "../thunks/userSliceThunk";

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}, extraReducers: (builder) => {
        builder
        .addCase(registerSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(registerSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            alert ("user created")
            // deberia logear
          })
        .addCase(registerSlice.rejected, (state, action) => {
            state.status = 'failed'
            alert ("user not created")
          })
    }
})

export const {} = userSlice.actions;
export default userSlice.reducer;