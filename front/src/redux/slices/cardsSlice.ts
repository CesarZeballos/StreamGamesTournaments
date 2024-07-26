import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBanner, ICardsState } from '@/interfaces/interfaceCards';

const initialState: ICardsState = {
  cards: [],
  currentPage: 1,
  cardsPerpage: 9,
  filter: 'All Tournaments',  // Agregar este estado
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<{ cards: IBanner[] }>) {
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
