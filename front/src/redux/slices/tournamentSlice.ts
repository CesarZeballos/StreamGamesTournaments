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
  filters: {
    game: "",
    category: "",
    price: "",
    date: ""
  },
  tournamentsFiltered: [],
};

const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    setTournaments(state, action: PayloadAction<ITournament[]>) {
      state.tournaments = action.payload;
    },
    setRunFilters(state, action: PayloadAction<IFiltersProp>) {
      console.log("filtrado", action.payload)

      //game
      let gameArray = state.tournaments
      if(state.filters.game === action.payload.game || action.payload.game === "") {
        state.filters.game = ""
      } else {
        state.filters.game = action.payload.game
        gameArray = state.tournaments.filter((tour) => tour.game.name === action.payload.game)
      }

      //category
      let categoryArray = gameArray
      if(state.filters.category === action.payload.category || action.payload.category === "") {
        state.filters.category = ""
      } else {
        state.filters.category = action.payload.category
        categoryArray = gameArray.filter((t) => t.category === action.payload.category)
      }

      //price
      let priceArray = categoryArray
      let minPrice = 1001
      let maxPrice = 9999999
      if(state.filters.price === action.payload.price || action.payload.price === "") {
        state.filters.price = ""
      } else {
        state.filters.price = action.payload.price
        if(action.payload.price === "cheap") {
          minPrice = 0
          maxPrice = 500
        } else if(action.payload.price === "medium") {
          minPrice = 501
          maxPrice = 1000
        } 
        priceArray = categoryArray.filter((t) => t.price >= minPrice && t.price <= maxPrice)
      }

      //date
      let dateArray = priceArray
      const date = new Date();
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth();
    
      if (state.filters.date === action.payload.date || action.payload.date === "") {
        state.filters.date = "";
      } else {
        state.filters.date = action.payload.price;
    
        if (action.payload.date === "thisMonth") {
          dateArray = priceArray.filter((t) => {
            const tournamentDate = parseDate(t.startDate);
            return tournamentDate.getMonth() === currentMonth && tournamentDate.getFullYear() === currentYear;
          });
        } else if (action.payload.date === "nextMonths") {
          dateArray = priceArray.filter((t) => {
            const tournamentDate = parseDate(t.startDate);
            return tournamentDate.getMonth() === currentMonth + 1 && tournamentDate.getFullYear() === currentYear;
          });
        } else if (action.payload.date === "moreMonths") {
          dateArray = priceArray.filter((t) => {
            const tournamentDate = parseDate(t.startDate);
            return tournamentDate.getMonth() > currentMonth + 1 && tournamentDate.getFullYear() === currentYear;
          });
        }
      }
      state.tournamentsFiltered = dateArray
      console.log("recultado", state.tournamentsFiltered, dateArray)
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
        state.tournamentsFiltered = action.payload
      });
  }
});

export const { setTournaments, setRunFilters } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;

function parseDate(dateString: string) {
  const [day, month] = dateString.split('/').map(Number);
  const year = new Date().getFullYear(); // Utiliza el año actual
  return new Date(year, month - 1, day); // Mes en JavaScript es 0-indexado
}