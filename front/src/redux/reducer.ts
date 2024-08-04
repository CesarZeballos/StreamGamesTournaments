import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cardsSlice from './slices/cardsSlice';
import dashboardSlice from './slices/dashboardSlice';
import auxiliarSlice from './slices/auxiliarSlice';
import tournamentsSlice from './slices/tournamentSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

//configuracion de la persistencia:
const persistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice);

const rootReducer = combineReducers({
  user: persistedReducer,
  tournament: tournamentsSlice,
  cards: cardsSlice,
  dashboard: dashboardSlice,
  auxiliar: auxiliarSlice
});

export default rootReducer;
