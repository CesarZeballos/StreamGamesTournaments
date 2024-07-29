import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    view: "data"
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setView(state, action: PayloadAction<string>) {
            state.view = action.payload
        }
    }
})

export const { setView } = dashboardSlice.actions
export default dashboardSlice.reducer