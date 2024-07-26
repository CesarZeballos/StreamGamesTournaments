import { IUserState } from "@/interfaces/interfaceRedux";
import { createSlice } from "@reduxjs/toolkit";
import { loginSlice, registerSlice } from "../thunks/userSliceThunk";
import { useRouter } from "next/navigation";

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
            const router = useRouter();

            state.status = 'succeeded'
            state.user = action.payload
            
            setTimeout(() => {
                router.push("/")
            }, 1500);
          })
        .addCase(loginSlice.rejected, (state, action) => {
            state.status = 'failed'
            alert ("fail in login")
          })
    }
})

export const {} = userSlice.actions;
export default userSlice.reducer;