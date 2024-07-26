import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cardsSlice from './slices/cardsSlice';

const rootReducer = combineReducers({
  user: userSlice,
  cards: cardsSlice,
  // tournament: tournamentSlice,
});

export default rootReducer;
