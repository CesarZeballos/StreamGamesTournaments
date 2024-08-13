import { createSlice } from '@reduxjs/toolkit';
import { Versus } from './versus.type';
import { fetchTournamentVersus } from './tournament.action';

interface TournamentState {
  versus: Versus[];
  loading: boolean;
}

const initialState: TournamentState = {
  versus: [],
  loading: false,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTournamentVersus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTournamentVersus.fulfilled, (state, action) => {
      state.versus = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTournamentVersus.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default tournamentSlice.reducer;
