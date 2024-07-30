import { ITournamentState } from "@/interfaces/interfaceRedux";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTournamentsSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";

const initialState: ITournamentState = {
  status: "idle",
  tournaments: []
};

const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<ITournament[]>) {
      state.tournaments = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTournamentsSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTournamentsSlice.rejected, (state, action) => {
        state.status = "failed";
        toast.error('Error in getting tournaments', {
          position: 'top-right',
          duration: 1500,
        });
      })
      .addCase(getTournamentsSlice.fulfilled, (state, action: PayloadAction<ITournament[]>) => {
        state.status = "succeeded";
        state.tournaments = action.payload;
      });
  }
});

export const { setTournaments } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;