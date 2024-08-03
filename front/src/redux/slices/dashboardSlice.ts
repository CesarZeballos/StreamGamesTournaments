import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { REHYDRATE } from "redux-persist"


const initialState = {
    view: ""
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setView(state, action: PayloadAction<string>) {
            state.view = action.payload
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(REHYDRATE as any, (state, action: AnyAction) => {
            if (action.payload) {
                // Validar el estado rehidratado
                const { view } = action.payload.auxiliar || {};
                if (view) {
                    state.view = view;
                }
            }
        })
    }
})

export const { setView } = dashboardSlice.actions
export default dashboardSlice.reducer