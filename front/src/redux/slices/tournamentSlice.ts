import { ITournamentState } from "@/interfaces/interfaceRedux";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTournamentsSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";

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
    }, extraReducers: (builder) => {
        builder
        .addCase(getTournamentsSlice.pending, (state) => {

        })
        .addCase(getTournamentsSlice.rejected, (state, action) => {
            toast.error('Error in get tournaments', {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(getTournamentsSlice.fulfilled, (state, action) => {
            state.tuornaments = action.payload
        })
    }
})