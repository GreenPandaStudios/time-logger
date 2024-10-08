import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IHaveId, IActivity } from '../../types';
import { randomUUID } from '../helpers';
import { stat } from 'fs';

export interface ActivityState {
  activityMap:  {
    [id: string]: IActivity & IHaveId;
}
}

const initialState: ActivityState = {
    activityMap: {
    },
};


export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addActivity: (state, action: {payload: {
        activity: IActivity;
    }}) => {
        const id = randomUUID();
        state.activityMap[id] = {...action.payload.activity, id: id};
    },
    updateDescription: (state, action: {payload: {id: string, description: string}}) => {
        state.activityMap[action.payload.id]={...state.activityMap[action.payload.id], description: action.payload.description};
    },
    deleteActivity: (state, action: {payload: {id: string}}) => {
      const { [action.payload.id]: _, ...rest } = state.activityMap;
      state.activityMap = rest;
    }
  }
});

export const { addActivity, updateDescription, deleteActivity } = activitySlice.actions;


export const getAllActivities= (state: RootState) => {
    return state.activity.activityMap;
}


export const activityReducer = activitySlice.reducer;