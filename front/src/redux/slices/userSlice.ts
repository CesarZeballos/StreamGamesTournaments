import { IUserState } from "@/interfaces/interfaceRedux";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addfriendSlice, forgotPasswordSlice, loginSlice, registerSlice, upgradeUserSlice } from "../thunks/userSliceThunk";
import { toast } from "sonner";
import { REHYDRATE } from "redux-persist";

const initialState: IUserState = {
  user: null,
  status: 'idle',
  statusRegister: 'idle',
  statusAddFriend: 'idle',
  error: null,
  token: null,
  statusForgotPassword: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserState>) {
            state.user = action.payload.user
        },
        logoutSlice(state) {
            toast(`See you later ${state.user?.nickname}`, {
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
        // REHYDRATE
        .addCase(REHYDRATE as any, (state, action: AnyAction) => {
          if (action.payload) {
            const rehydratedState = action.payload.user;
            if (rehydratedState) {
              state.user = rehydratedState.user;
              state.status = rehydratedState.status;
              state.statusRegister = rehydratedState.statusRegister;
              state.statusAddFriend = rehydratedState.statusAddFriend;
              state.error = rehydratedState.error;
              state.token = rehydratedState.token;
              state.statusForgotPassword = rehydratedState.statusForgotPassword;
            }
          }
        })

        // REGISTER
        .addCase(registerSlice.pending, (state) => {
            state.statusRegister = 'loading'
            state.error = null
        })
        .addCase(registerSlice.fulfilled, (state, action) => {
            state.statusRegister = 'succeeded'
            toast.success('user created', {
                position: 'top-right',
                duration: 1500,
              })
            })
        .addCase(registerSlice.rejected, (state, action) => {
            state.statusRegister = 'failed'
            toast.error('user not created', {
                position: 'top-right',
                duration: 1500,
              })
        })
        
        // LOGIN
        .addCase(loginSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(loginSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.statusRegister = 'idle'
            if (action.payload) {
                state.user = action.payload.user
                state.token = action.payload.token
            } else return

            toast.success(`welcome ${action.payload.user.nickname}`, {
                position: 'top-right',
                duration: 1500,
              })
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status = 'failed'
            toast.error('fail in login: user or password incorrect', {
                position: 'top-right',
                duration: 1500,
              })
          })

          // FORGOT PASSWORD
          .addCase(forgotPasswordSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
          })
          .addCase(forgotPasswordSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.statusRegister = 'idle'
            // state.user = action.payload.user
            // state.token = action.payload.token

            toast.success(`shortly you will receive an email to recover your password`, {
                position: 'top-right',
                duration: 1500,
              })
          })
          .addCase(forgotPasswordSlice.rejected, (state, action) => {
            state.status = 'failed'
            toast.error('fail in password recovery', {
                position: 'top-right',
                duration: 1500,
              })
          })

          // ADD FRIEND
          .addCase(addfriendSlice.pending, (state) => {
            state.statusAddFriend = 'loading'
            state.error = null
          })
          .addCase(addfriendSlice.fulfilled, (state, action) => {
            state.statusAddFriend = 'succeeded'
            toast.success('friend request sent', {
                position: 'top-right',
                duration: 1500,
              })
            })
          .addCase(addfriendSlice.rejected, (state, action) => {
            state.statusAddFriend = 'failed'
            toast.error('friend request not sent', {
                position: 'top-right',
                duration: 1500,
              })
          })

          // UPGRADE USER

          .addCase(upgradeUserSlice.pending, (state) => {
            state.error = null
          })
          .addCase(upgradeUserSlice.fulfilled, (state, action) => {
            toast.success('We will review your application. You will be notified by email when you become a tournament organizer.', {
                position: 'top-right',
                duration: 1500,
              })
            })
          .addCase(upgradeUserSlice.rejected, (state, action) => {
            toast.error('Failed to send the request. Please try again in a few minutes.', {
                position: 'top-right',
                duration: 1500,
              })
          })
    }
})

export const {setUser, logoutSlice} = userSlice.actions;
export default userSlice.reducer;