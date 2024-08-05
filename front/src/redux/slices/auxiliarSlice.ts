import { IAuxiliarState } from "@/interfaces/interfaceRedux";
import { createSlice, PayloadAction, AnyAction  } from "@reduxjs/toolkit";
import { getUsersSlice } from "../thunks/auxiliarSliceThunk";
import { toast } from "sonner";
import { REHYDRATE } from "redux-persist";


const initialState: IAuxiliarState = {
    users: [],
    status: 'idle',
    error: null
}

const auxiliarSlice = createSlice({
    name: "auxiliar",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IAuxiliarState>) {
            state.users = action.payload.users
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(REHYDRATE as any, (state, action: AnyAction) => {
            if (action.payload) {
                // Validar el estado rehidratado
                const { users, status } = action.payload.auxiliar || {};
                if (users && status) {
                    state.users = users;
                    state.status = status;
                }
            }
        })
        .addCase(getUsersSlice.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getUsersSlice.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.users = action.payload
        })
        .addCase(getUsersSlice.rejected, (state, action) => {
            state.status = 'failed'
            toast.error('users not loaded', {
                position: 'top-right',
                duration: 1500,
            })
        })
    }
})

export const { setUsers } = auxiliarSlice.actions
export default auxiliarSlice.reducer