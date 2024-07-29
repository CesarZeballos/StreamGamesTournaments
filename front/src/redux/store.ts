import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import tournamentsReducer from './slices/tournamentSlice';
import userReducer from './slices/userSlice';
import dashboardReducer from './slices/dashboardSlice';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combinamos todos los reducers en uno solo
const rootReducer = combineReducers({
  cards: cardsReducer,
  tournaments: tournamentsReducer,
  user: userReducer,
  dashboard: dashboardReducer,
});

// persistencia de datos
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuramos el store con el rootReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para evitar advertencias de serialización
    }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;