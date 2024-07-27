import { IUserState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSlice, registerSlice } from "../thunks/userSliceThunk";
import { toast } from "sonner";

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null,
    token: null,
    statusRegister: 'idle'
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserState>) {
            state.user = action.payload.user
        },
        logoutSlice(state) {
            toast(`See you later ${state.user?.nickName}`, {
                position: 'top-right',
                duration: 1500,
              })
            state.user = null
            state.status = 'idle'
            state.error = null
            state.token = null
            state.statusRegister = 'idle'            
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(registerSlice.pending, (state) => {
            state.statusRegister = 'loading'
            state.error = null
        })
        .addCase(registerSlice.fulfilled, (state, action) => {
            state.statusRegister = 'succeeded'
            toast('user created', {
                position: 'top-right',
                duration: 1500,
              })
            })
        .addCase(registerSlice.rejected, (state, action) => {
            state.statusRegister = 'failed'
            toast('user not created', {
                position: 'top-right',
                duration: 1500,
              })
        })
        
        .addCase(loginSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(loginSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.statusRegister = 'idle'
            state.user = action.payload.user
            state.token = action.payload.token

            toast.success(`welcome ${action.payload.user.nickName}`, {
                position: 'top-right',
                duration: 1500,
              })
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status = 'failed'
            toast('fail in login', {
                position: 'top-right',
                duration: 1500,
              })
          })
    }
})

export const {setUser, logoutSlice} = userSlice.actions;
export default userSlice.reducer;