import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cardsSlice from './slices/cardsSlice';
import { registerSlice } from './thunks/userSliceThunk';

const rootReducer = combineReducers({
  user: userSlice,
  cards: cardsSlice,
});

export default rootReducer;
