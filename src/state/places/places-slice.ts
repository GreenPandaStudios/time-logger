import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { IHaveId, IPlace } from "../../types";
import { randomUUID } from "../helpers";

export interface PlacesState {
	placesMap: {
		[id: string]: IPlace & IHaveId;
	};
}

const initialState: PlacesState = {
	placesMap: {},
};

export const placesSlice = createSlice({
	name: "places",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		addPlace: (
			state,
			action: {
				payload: {
					place: IPlace;
				};
			}
		) => {
			const id = randomUUID();
			state.placesMap[id] = { ...action.payload.place, id: id };
		},
		updatePlaceDescription: (
			state,
			action: { payload: { id: string; description: string } }
		) => {
			state.placesMap[action.payload.id] = {
				...state.placesMap[action.payload.id],
				description: action.payload.description,
			};
		},
		deletePlace: (state, action: { payload: { id: string } }) => {
			const { [action.payload.id]: _, ...rest } = state.placesMap;
			state.placesMap = rest;
		},
		addCoordinatesToPlace: (
			state,
			action: { payload: { id: string; latitude: number; longitude: number } }
		) => {
			const place = state.placesMap[action.payload.id];
			if (place) {
				if (place.coordinates) {
					place.coordinates.push({
						latitude: action.payload.latitude,
						longitude: action.payload.longitude,
					});
				} else {
					place.coordinates = [
						{
							latitude: action.payload.latitude,
							longitude: action.payload.longitude,
						},
					];
				}
			}
			state.placesMap[action.payload.id] = place;
		},
	},
});

export const {
	addPlace,
	updatePlaceDescription,
	deletePlace,
	addCoordinatesToPlace,
} = placesSlice.actions;

export const getAllPlaces = (state: RootState) => {
	return state.places.placesMap;
};

export const placesReducer = placesSlice.reducer;
