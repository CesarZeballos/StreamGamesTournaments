import { createAsyncThunk } from '@reduxjs/toolkit';
import { Versus } from './versus.type';

export const fetchTournamentVersus = createAsyncThunk<Versus[], string>(
  'tournament/fetchVersus',
  async (tournamentId, thunkAPI) => {
    const response = await fetch(`/api/tournaments/${tournamentId}/versus`);
    return (await response.json()) as Versus[];
  }
);
