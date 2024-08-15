import { IUserState } from "@/interfaces/interfaceRedux";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { REHYDRATE } from "redux-persist";
import { forgotPasswordSlice, loginSlice, registerSlice, reloadUserSlice, updateUserSlice, upgradeRequestUserSlice } from "../thunks/userSliceThunk";

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
        },
        setStatusFriend(state) {
            state.statusAddFriend = 'idle'
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
        .addCase(loginSlice.fulfilled, (state, action) => {
          if (action.payload.token) {
                state.status = 'succeeded'
                state.statusRegister = 'idle'
                console.log("response back ", action.payload)
                state.user = action.payload.user
                state.token = action.payload.token
                toast.success(`welcome ${action.payload.user.nickname}`, {
                    position: 'top-right',
                    duration: 1500,
                  })
            } else {
                state.status = 'failed'
                toast.error(`${action.payload}`, {
                    position: 'top-right',
                    duration: 1500,
                  })
            }
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status = 'failed'
            state.statusRegister = 'idle'
            console.log(action.error.message)
            toast.error('fail in login: user or password incorrect', {
                position: 'top-right',
                duration: 1500,
              })
          })

          // RELOAD USER
          .addCase(reloadUserSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.statusRegister = 'idle'
            if (action.payload) {
                state.user = action.payload.user
                state.token = action.payload.token
            } else return
          })
          .addCase(reloadUserSlice.rejected, (state, action) => {
            state.status = 'failed'
            state.statusRegister = 'idle'
          })

          // FORGOT PASSWORD
          .addCase(forgotPasswordSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.statusRegister = 'idle'

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

          // UPGRADE USER
        .addCase(upgradeRequestUserSlice.fulfilled, (state, action) => {
          toast.success('We will review your application. You will be notified by email when you become a tournament organizer.', {
              position: 'top-right',
              duration: 1500,
              })
          })
          .addCase(upgradeRequestUserSlice.rejected, (state, action) => {
          toast.error('Failed to send the request. Please try again in a few minutes.', {
              position: 'top-right',
              duration: 1500,
              })
          })

        // UPGRADE DATA
        .addCase(updateUserSlice.fulfilled, (state, action) => {
          toast.success('Data Updated.', {
              position: 'top-right',
              duration: 1500,
          });
          if (action.payload.user) {
              state.user = {
                  ...state.user,  // Mantén los datos anteriores
                  ...action.payload.user  // Sobrescribe solo los campos que se actualizaron
              };
          }
      })
    }
})

export const {setUser, logoutSlice, setStatusFriend} = userSlice.actions;
export default userSlice.reducer;