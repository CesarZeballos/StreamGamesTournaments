import { ITournamentState } from "@/interfaces/interfaceRedux";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTournamentsSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";
import { REHYDRATE } from "redux-persist";

const initialState: ITournamentState = {
  status: "idle",
  tournaments: [],
  currentPage: 1,
  filters: {
    game: "",
    category: "",
    price: 0,
    date: ""
  },
  tournamentsGame: [],
  tournamentsCategory: [],
  tournamentsPrice: [],
  tournamentsDate: [],
  tournamentsFiltered: [],
};

const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<ITournament[]>) {
      state.tournaments = action.payload;
    },
    setCleanFilters(state) {
      state.filters = {
        game: "",
        category: "",
        price: 0,
        date: ""
      }
      state.tournamentsCategory = state.tournaments
      state.tournamentsDate = state.tournaments
      state.tournamentsPrice = state.tournaments
      state.tournamentsGame = state.tournaments
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(REHYDRATE as any, (state, action: AnyAction) => {
        if (action.payload) {
          const rehydratedState = action.payload.tournaments;
          if (rehydratedState) {
            state.status = rehydratedState.status;
            state.tournaments = rehydratedState.tournaments;
            state.currentPage = rehydratedState.currentPage;
            state.filters = rehydratedState.filters;
            state.tournamentsGame = rehydratedState.tournamentsGame;
            state.tournamentsCategory = rehydratedState.tournamentsCategory;
            state.tournamentsPrice = rehydratedState.tournamentsPrice;
            state.tournamentsDate = rehydratedState.tournamentsDate;
            state.tournamentsFiltered = rehydratedState.tournamentsFiltered;
          }
        }
      })
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
        setCleanFilters()
      });
  }
});

export const { setTournaments, setCleanFilters } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;