import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import userSlice from './slices/userSlice';
// import rootReducer from './reducer';

const rootReducer = combineReducers({
  cards: cardsReducer,
  user: userSlice
  
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;