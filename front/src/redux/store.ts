import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import tournamentsReducer from './slices/tournamentSlice';
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboardSlice';
import { useDispatch } from 'react-redux';

// Combinamos todos los reducers en uno solo
const rootReducer = combineReducers({
  cards: cardsReducer,
  tournaments: tournamentsReducer,
  user: userReducer,
  dashboard: dashboardReducer,
});

// Configuramos el store con el rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;