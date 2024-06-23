import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IHaveId, IPlace } from '../../types';
import { randomUUID } from '../helpers';

export interface PlacesState {
  placesMap:  {
    [id: string]: IPlace & IHaveId;
}
}

const initialState: PlacesState = {
    placesMap: {
    },
};


export const placesSlice = createSlice({
  name: 'places',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPlace: (state, action: {payload: {
        place: IPlace;
    }}) => {
        const id = randomUUID();
        state.placesMap[id] = {...action.payload.place, id: id};
    },
  }
});

export const { addPlace } = placesSlice.actions;


export const getAllPlaces= (state: RootState) => {
    return state.places.placesMap;
}


export const placesReducer = placesSlice.reducer;