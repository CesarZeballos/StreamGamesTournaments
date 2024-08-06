import { IFilters, IFiltersProp, ITournamentState } from "@/interfaces/interfaceRedux";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTournamentsSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";
import { REHYDRATE } from "redux-persist";

const initialState: ITournamentState = {
  status: "idle",
  tournaments: [],
  currentPage: 1,
  tournamentsPerPage: 9,
  filters: {
    game: "",
    category: "",
    price: "",
    date: ""
  },
  tournamentsFiltered: []
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<ITournament[]>) {
      state.tournaments = action.payload;
    },
    setRootFilters(state, action: PayloadAction<IFiltersProp>) {
      if (action.payload.value === state.filters[action.payload.name]) {
        state.filters[action.payload.name] = ""
      } else { 
        state.filters[action.payload.name] = action.payload.value; 
      }
    },
    setRunFilters(state) {

      //game
      let gameArray = state.tournaments
      if(state.filters.game !== "") {
        gameArray = state.tournaments.filter((tour) => tour.game.name === state.filters.game)
      } 

      //category
      let categoryArray = gameArray
      if(state.filters.category !== "") {
        categoryArray = gameArray.filter((t) => t.category === state.filters.category)
      }

      //price
      let priceArray = categoryArray
      if(state.filters.price !== "") { 
        let minPrice = 1001
        let maxPrice = 9999999
          if(state.filters.price === "cheap") {
            minPrice = 0
            maxPrice = 500
          } else if(state.filters.price === "medium") {
            minPrice = 501
            maxPrice = 1000
          } 
          priceArray = categoryArray.filter((t) => t.price >= minPrice && t.price <= maxPrice)
       }

      //date
      let dateArray = priceArray
      if(state.filters.date !== "") {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
      
          if (state.filters.date === "thisMonth") {
            dateArray = priceArray.filter((t) => {
              const tournamentDate = new Date(t.startDate);
              return tournamentDate.getMonth() === currentMonth && tournamentDate.getFullYear() === currentYear;
            });
          } else if (state.filters.date === "nextMonths") {
            dateArray = priceArray.filter((t) => {
              const tournamentDate = new Date(t.startDate);
              return tournamentDate.getMonth() === currentMonth + 1 && tournamentDate.getFullYear() === currentYear;
            });
          } else if (state.filters.date === "moreMonths") {
            dateArray = priceArray.filter((t) => {
              const tournamentDate = new Date(t.startDate);
              return tournamentDate.getMonth() > currentMonth + 1 && tournamentDate.getFullYear() === currentYear;
            });
          }
      }
      state.tournamentsFiltered = dateArray
      state.currentPage = 1
    },

    // paginado

    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
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
            state.tournamentsFiltered = rehydratedState.tournamentsFiltered;
          }
        }
      })
      .addCase(getTournamentsSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTournamentsSlice.rejected, (state) => {
        state.status = 'failed';
        toast.error('Error in getting tournaments', {
          position: 'top-right',
          duration: 1500,
        });
      })
      .addCase(getTournamentsSlice.fulfilled, (state, action: PayloadAction<ITournament[]>) => {
        state.status = "succeeded";
        state.tournaments = action.payload
        state.tournamentsFiltered = action.payload
      });
  },
});

export const { setTournaments, setRunFilters, setRootFilters, setPage } = tournamentSlice.actions;
export default tournamentSlice.reducer;