import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICardsState } from '@/interfaces/interfaceCards';
import { ITournament } from '@/interfaces/interfaceTournaments';

const initialState: ICardsState = {
  cards: [],
  currentPage: 1,
  cardsPerpage: 9,
  filter: 'All Tournaments',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: ITournament[] }>) {
      state.cards = action.payload.cards;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) { 
      state.filter = action.payload;
    },
  },
});

export const { setCards, setCurrentPage, setFilter } = cardsSlice.actions;
export default cardsSlice.reducer;
