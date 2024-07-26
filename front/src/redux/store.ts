import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import tournamentsReducer from './slices/tournamentSlice';

const rootReducer = combineReducers({
  cards: cardsReducer,
  tournaments: tournamentsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;