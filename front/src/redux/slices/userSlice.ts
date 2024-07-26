import { IUserState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSlice, registerSlice } from "../thunks/userSliceThunk";

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserState>) {
            state.user = action.payload.user
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(registerSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(registerSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            alert ("user created")
            loginSlice({
                email: action.payload.email, 
                password: action.payload.password})
        })
        .addCase(registerSlice.rejected, (state, action) => {
            state.status = 'failed'
            alert ("user not created")
        })
        
        .addCase(loginSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(loginSlice.fulfilled, (state, action) => {
            console.log("loginSlice", action.payload)

            state.status = 'succeeded'
            state.user = action.payload.user
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status = 'failed'
            alert ("fail in login")
          })
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;