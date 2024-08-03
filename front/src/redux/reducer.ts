import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import dashboardSlice from './slices/dashboardSlice';
import auxiliarSlice from './slices/auxiliarSlice';
import tournamentSlice from './slices/tournamentSlice';

const rootReducer = combineReducers({
  user: userSlice,
  dashboard: dashboardSlice,
  auxiliar: auxiliarSlice,
  tournaments: tournamentSlice
});

export default rootReducer;
