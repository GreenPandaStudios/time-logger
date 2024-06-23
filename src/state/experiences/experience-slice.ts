import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IExperience, IHaveId } from '../../types';
import { randomUUID } from '../helpers';

export interface ExperiencesState {
  experiences:  {
    log: (IExperience & IHaveId)[];
    map: {
        [id: string]: IExperience & IHaveId;
    }
  }
}

const initialState: ExperiencesState = {
    experiences: {
        log: [],
        map: {}
    },
};


export const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addExperience: (state, action: {payload: {
        experience: IExperience;
        // If no time is included, we use the current time
        startTime?: Date;
    }}) => {


        let {experience, startTime} = action.payload;
        if (startTime === undefined) {
            startTime = new Date(Date.now());
        }
        
        // Actually add the experience
        const id = randomUUID();
        const insertedExperience = {...experience, id}
        state.experiences.log.push(insertedExperience);
        state.experiences.map[id] = insertedExperience;
        
        // When we add an experience at a time that is not the most recent, we need to sort the array of experiences on timestamp
        const lastExperience =  state.experiences.log[state.experiences.log.length - 2];
        if (lastExperience && lastExperience.start > startTime.valueOf()) {
            state.experiences.log.sort((e1,e2) => (e1.start > e2.start ? 1 : -1));
            // Find our location and set the experience that came just before us's end time to our start time
            const index = state.experiences.log.indexOf(insertedExperience);
            if (index !== -1 && index !== 0) {
                state.experiences.log[index - 1].end = insertedExperience.start;
            }
        }
        else if (lastExperience) {
            // This is just a new experience at the end
            lastExperience.end = insertedExperience.start;
        }
    },
  }
});

export const { addExperience } = experienceSlice.actions;

export const getExperience = (state: RootState, id: string) : (IExperience & IHaveId) | undefined=>  {
    const experience = state.experience.experiences.map[id] ?? undefined;
    
    if (experience === undefined) return undefined;

    return experience;
}

export const getAllExperiences = (state: RootState) : (IExperience & IHaveId)[] => {
    return state.experience.experiences.log;
}


export const experienceReducer = experienceSlice.reducer;
