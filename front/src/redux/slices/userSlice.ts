import { IUserState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSlice, registerSlice } from "../thunks/userSliceThunk";

const initialState: IUserState = {
    user: null,
    status: 'idle',
    error: null,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUserState>) {
            state.user = action.payload.user
        },
        logoutSlice(state) {
            alert(`See you later ${state.user?.nickName}`)
            state.user = null
            state.status = 'idle'
            state.error = null
            state.token = null            
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(registerSlice.pending, (state) => {
            state.error = null
        })
        .addCase(registerSlice.fulfilled, (state, action) => {
            // loginSlice({
            //     email: action.payload.user.email, 
            //     password: action.payload.user.password})
                alert ("user created")
            })
        .addCase(registerSlice.rejected, (state, action) => {
            alert ("user not created")
        })
        
        .addCase(loginSlice.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(loginSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user = action.payload.user
            state.token = action.payload.token

            alert (`welcome ${action.payload.user.nickName}`)
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status = 'failed'
            alert ("fail in login")
          })
    }
})

export const {setUser, logoutSlice} = userSlice.actions;
export default userSlice.reducer;