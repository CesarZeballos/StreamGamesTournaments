import { ITournamentState } from "@/interfaces/interfaceRedux";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITournamentState = {
    tuornaments: []
}

const tournamentsSlice = createSlice({
    name: "tournaments",
    initialState,
    reducers: {
        setTournaments(state, action: PayloadAction<ITournament[]>) {
            state.tuornaments = action.payload
        }
    }
})