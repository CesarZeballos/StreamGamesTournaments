import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartas: [],
  paginaActual: 1,
  cartasPorPagina: 9,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCartas(state, action) {
      state.cartas = action.payload.cartas;
    },
    setPaginaActual(state, action) {
      state.paginaActual = action.payload;
    },
  },
});

export const { setCartas, setPaginaActual } = cardsSlice.actions;
export default cardsSlice.reducer;