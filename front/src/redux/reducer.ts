import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cardsSlice from './slices/cardsSlice';
import { registerSlice } from './thunks/userSliceThunk';
import dashboardSlice from './slices/dashboardSlice';

const rootReducer = combineReducers({
  user: userSlice,
  cards: cardsSlice,
  dashboard: dashboardSlice,
});

export default rootReducer;
