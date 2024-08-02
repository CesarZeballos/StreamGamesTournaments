import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cardsSlice from './slices/cardsSlice';
import dashboardSlice from './slices/dashboardSlice';
import auxiliarSlice from './slices/auxiliarSlice';

const rootReducer = combineReducers({
  user: userSlice,
  cards: cardsSlice,
  dashboard: dashboardSlice,
  auxiliar: auxiliarSlice
});

export default rootReducer;
