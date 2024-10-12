import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IExperience, IHaveId } from '../../types';
import { randomUUID } from '../helpers';

export interface ExperiencesState {
  experiences:  {
    log: (string)[];
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
        state.experiences.log.push(id);
        state.experiences.map[id] = insertedExperience;
        
        // When we add an experience at a time that is not the most recent, we need to sort the array of experiences on timestamp
        const lastExperience =  state.experiences.map[state.experiences.log[state.experiences.log.length - 2]];
        if (lastExperience && lastExperience.start < startTime.valueOf()) {
            state.experiences.log.sort((e1,e2) => (state.experiences.map[e1].start > state.experiences.map[e2].start ? 1 : -1));
            // Find our location and set the experience that came just before us's end time to our start time
            const index = state.experiences.log.indexOf(insertedExperience.id);
            if (index !== -1 && index !== 0) {
                state.experiences.map[state.experiences.log[index - 1]].end = insertedExperience.start;

                // If this results in any experiences having negative duration, we need to remove them
                for (let i = 0; i < state.experiences.log.length; i++) {
                    if (state.experiences.map[state.experiences.log[i]].start
                        >= (state.experiences.map[state.experiences.log[i]].end
                            ?? state.experiences.map[state.experiences.log[i]].start + 1)) {
                        state.experiences.log.splice(i, 1);
                        delete state.experiences.map[i];
                    }
                }

                // Make sure all experiences that are not at the end have an end time
                for (let i = 0; i < state.experiences.log.length - 2; i++) {
                    state.experiences.map[state.experiences.log[i]].end
                    = state.experiences.map[state.experiences.log[i + 1]].start;
                }
            state.experiences.map[state.experiences.log[state.experiences.log.length - 1]].end = undefined;
            }
        }
        else if (lastExperience) {
            // This is just a new experience at the end
            lastExperience.end = insertedExperience.start;
        }
    },
    setRating(state, action: PayloadAction<{id: string, rating: number}>) {
        const experience = {...
            state.experiences.map[action.payload.id],
            rating: action.payload.rating
        };
        state.experiences.map[action.payload.id] = experience;
    },
    deleteExperience(state, action: PayloadAction<{id: string}>) {
        const { [action.payload.id]: _, ...rest } = state.experiences.map;
        state.experiences.map = rest;
        state.experiences.log = state.experiences.log.filter((id) => id !== action.payload.id);
        for (let i = 0; i < state.experiences.log.length - 2; i++) {
                state.experiences.map[state.experiences.log[i]].end
                = state.experiences.map[state.experiences.log[i + 1]].start;
        }
        
        // If there are any experiences left in the log, the last one should not have an end time
        if (state.experiences.log.length > 0)
        {
            state.experiences.map[state.experiences.log[state.experiences.log.length - 1]].end = undefined;
        }
    },
    resolveUploadedData(state, action: PayloadAction<{experiences: (IExperience & IHaveId)[]}>) {

        // Clear out the old experiences, add the new ones
        for (const experience of action.payload.experiences) {
            state.experiences.map[experience.id] = experience;
        }

        // Resolve the log to just the values in the map
        state.experiences.log = Object.values(state.experiences.map).map((experience) => experience.id);

        // Sort the log
        state.experiences.log.sort((e1,e2) => (state.experiences.map[e1].start > state.experiences.map[e2].start ? 1 : -1));

        // Make sure all experiences that are not at the end have an end time
        for (let i = 0; i < state.experiences.log.length - 2; i++) {
            state.experiences.map[state.experiences.log[i]].end
            = state.experiences.map[state.experiences.log[i + 1]].start;
        }
        
        // Delete any experiences that have negative or 0 duration
        for (let i = 0; i < state.experiences.log.length; i++) {
            if (state.experiences.map[state.experiences.log[i]].start
                >= (state.experiences.map[state.experiences.log[i]].end
                    ?? state.experiences.map[state.experiences.log[i]].start + 1)) {
                state.experiences.log.splice(i, 1);
                delete state.experiences.map[i];
            }
        }

        // If there are any experiences left in the log, the last one should not have an end time
        if (state.experiences.log.length > 0)
        {
            state.experiences.map[state.experiences.log[state.experiences.log.length - 1]].end = undefined;
        }
        
    },
    setJournal(state, action: PayloadAction<{id: string, journal: string}>) {
        state.experiences.map[action.payload.id] = {...
            state.experiences.map[action.payload.id],
            journal: action.payload.journal
        };
    }
  }
});




export const { addExperience, setRating, deleteExperience, resolveUploadedData, setJournal } = experienceSlice.actions;

export const getExperience = (state: RootState, id: string) : (IExperience & IHaveId) | undefined=>  {
    const experience = state.experience.experiences.map[id] ?? undefined;
    
    if (experience === undefined) return undefined;

    return experience;
}

export const getAllExperiences = (state: RootState) : (IExperience & IHaveId)[] => {
    return state.experience.experiences.log.map((id) => state.experience.experiences.map[id]);
}


export const experienceReducer = experienceSlice.reducer;
