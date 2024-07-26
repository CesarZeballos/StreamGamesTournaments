// tournamentSlice.ts
import { ITournamentState } from "@/interfaces/interfaceRedux";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITournamentState = {
  tournaments: []
};

const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<ITournament[]>) {
      state.tournaments = action.payload;
    }
  }
});

export const { setTournaments } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;
