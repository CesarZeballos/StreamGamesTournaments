import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import dashboardSlice from './slices/dashboardSlice';
import auxiliarSlice from './slices/auxiliarSlice';
import userActionSlice from './slices/userActionsSlice';
import tournamentsSlice from './slices/tournamentSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import paymentSlice from './slices/paymentSlice';
import organizerSlice from './slices/organizerSlice';
import chatSlice from './slices/chatSlice';

//configuracion de la persistencia:
const persistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice);

const rootReducer = combineReducers({
  user: persistedReducer,
  tournament: tournamentsSlice,
  dashboard: dashboardSlice,
  auxiliar: auxiliarSlice,
  actions: userActionSlice,
  payment: paymentSlice,
  organizer: organizerSlice,
  chat: chatSlice
});

export default rootReducer;
