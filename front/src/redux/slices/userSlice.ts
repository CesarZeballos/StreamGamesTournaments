import { IUserState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forgotPasswordSlice, loginSlice, registerSlice, reloadUSerDataSlice } from "../thunks/userSliceThunk";
import { toast } from "sonner";
import { addTeam } from "../thunks/tournamentsSliceThunk";

const initialState: IUserState = {
    user: null,
    status: {
        access: 'idle',
        register: 'idle',
        forgotPassword: 'idle',
        team: 'idle',
        teamTournament: 'idle'
    },
    error: null,
    token: null,
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
            state.status.access = 'idle'
            state.status.register = 'idle'
            state.status.forgotPassword = 'idle'
            state.status.team = 'idle'
            state.status.teamTournament = 'idle'
            state.error = null
            state.token = null            
        }
    }, extraReducers: (builder) => {
        builder
        // REGISTER
        .addCase(registerSlice.pending, (state) => {
            state.status.register = 'loading'
            state.error = null
        })
        .addCase(registerSlice.fulfilled, (state, action) => {
            state.status.register = 'succeeded'
            toast.success('user created', {
                position: 'top-right',
                duration: 1500,
              })
            })
        .addCase(registerSlice.rejected, (state, action) => {
            state.status.register = 'failed'
            toast.error('user not created', {
                position: 'top-right',
                duration: 1500,
              })
        })
        
        // LOGIN
        .addCase(loginSlice.pending, (state) => {
            state.status.access = 'loading'
            state.error = null
        })
        .addCase(loginSlice.fulfilled, (state, action) => {
            state.status.access = 'succeeded'
            state.status.register = 'idle'
            console.log("payload", action.payload)
            if (action.payload) {
                state.user = action.payload.user
                state.token = action.payload.token
            } else return

            toast.success(`welcome ${action.payload.user.nickName}`, {
                position: 'top-right',
                duration: 1500,
              })
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status.access = 'failed'
            toast.error('fail in login', {
                position: 'top-right',
                duration: 1500,
              })
          })

          // RELOAD USER DATA
          .addCase(reloadUSerDataSlice.pending, (state) => {
            state.status.access = 'loading'
            state.error = null
          })
          .addCase(reloadUSerDataSlice.fulfilled, (state, action) => {
            state.status.access = 'succeeded'
            state.status.access = 'idle'
            // state.user = action.payload.user
            // state.token = action.payload.token
            console.log("payload", action.payload)
          })
          .addCase(reloadUSerDataSlice.rejected, (state, action) => {
            state.status.access = 'failed'
          })

          // FORGOT PASSWORD
          .addCase(forgotPasswordSlice.pending, (state) => {
            state.status.forgotPassword = 'loading'
            state.error = null
          })
          .addCase(forgotPasswordSlice.fulfilled, (state, action) => {
            state.status.forgotPassword = 'succeeded'
            toast.success(`shortly you will receive an email to recover your password`, {
                position: 'top-right',
                duration: 1500,
              })
          })
          .addCase(forgotPasswordSlice.rejected, (state, action) => {
            state.status.forgotPassword = 'failed'
            toast.error('fail in password recovery', {
                position: 'top-right',
                duration: 1500,
              })
          })

          // ADD TEAM TO TOURNAMENTS
          .addCase(addTeam.pending, (state) => {
            state.status.team = 'loading'
            state.error = null
          })
          .addCase(addTeam.fulfilled, (state, action) => {
            state.status.team = 'succeeded'
            toast.success(`Your team added to the tournament`, {
                position: 'top-right',
                duration: 1500,
              })
          })
          .addCase(addTeam.rejected, (state, action) => {
            state.status.team = 'failed'
            toast.error('fail in adding team', {
                position: 'top-right',
                duration: 1500,
              })
          })
    }
})

export const {setUser, logoutSlice} = userSlice.actions;
export default userSlice.reducer;