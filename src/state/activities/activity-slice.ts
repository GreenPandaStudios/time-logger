import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IHaveId, IActivity } from '../../types';
import { randomUUID } from '../helpers';

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
  }
});

export const { addActivity } = activitySlice.actions;


export const getAllActivities= (state: RootState) => {
    return state.activity.activityMap;
}


export const activityReducer = activitySlice.reducer;