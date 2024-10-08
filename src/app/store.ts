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

const persistConfig = {
  key: 'root',
  storage,
}

const persistedExperienceReducer = persistReducer(persistConfig, experienceReducer) 
const persistedPlacesReducer = persistReducer(persistConfig, placesReducer) 
const persistedPeopleReducer = persistReducer(persistConfig, personReducer)
const persistedActivityReducer = persistReducer(persistConfig, activityReducer);

export const store = configureStore({
  reducer: {
    experience: persistedExperienceReducer,
    places: persistedPlacesReducer,
    people: persistedPeopleReducer,
    activity: persistedActivityReducer
  },
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
