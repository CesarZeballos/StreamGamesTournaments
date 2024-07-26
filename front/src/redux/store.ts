import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';

const rootReducer = combineReducers({
  cards: cardsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;