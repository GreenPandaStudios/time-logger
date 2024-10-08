import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IHaveId, IPerson } from '../../types';
import { randomUUID } from '../helpers';

export interface PlacesState {
  peopleMap:  {
    [id: string]: IPerson & IHaveId;
}
}

const initialState: PlacesState = {
    peopleMap: {
    },
};


export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addPerson: (state, action: {payload: {
        person: IPerson;
    }}) => {
        const id = randomUUID();
        state.peopleMap[id] = {...action.payload.person, id: id};
    },
    updatePersonName: (state, action: {payload: {id: string, name: string}}) => {
        state.peopleMap[action.payload.id]={...state.peopleMap[action.payload.id], name: action.payload.name};
    },
    deletePerson: (state, action: {payload: {id: string}}) => {
      const { [action.payload.id]: _, ...rest } = state.peopleMap;
      state.peopleMap = rest;
    }
  }
});

export const { addPerson, updatePersonName, deletePerson } = peopleSlice.actions;


export const getAllPeople= (state: RootState) => {
    return state.people.peopleMap;
}


export const personReducer = peopleSlice.reducer;