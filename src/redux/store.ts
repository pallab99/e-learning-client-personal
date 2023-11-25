import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  Persistor,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { AppDispatch, RootState } from '../types/redux';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import fileUploadProgressSlice from './slices/fileUploadProgressSlice';
import instructorSearch from './slices/instructorSearch';
import wishListSlice from './slices/wishListSlice';
import courseSlice from './slices/courseSlice';
import userProgressSlice from './slices/userProgressSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  wishlist: wishListSlice,
  uploadProgress: fileUploadProgressSlice,
  instructor: instructorSearch,
  course: courseSlice,
  userProgress: userProgressSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor: Persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
