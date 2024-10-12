import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {experienceReducer} from '../state/experiences/experience-slice';
import {placesReducer} from '../state/places/places-slice';
import {personReducer} from "../state/people/people-slice";
import {activityReducer} from "../state/activities/activity-slice";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  experience: experienceReducer,
  places: placesReducer,
  people: personReducer,
  activity: activityReducer,
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

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
