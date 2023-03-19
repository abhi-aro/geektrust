import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPlanets, fetchVehicles } from "./homeAPI";

const initialState = {
	planets: [],
	vehicles: [],
	selectedPlanets: [],
	loading: false,
};

export const getPlanets = createAsyncThunk("home/fetchPlanets", async () => {
	const response = await fetchPlanets();
	return response.data;
});

export const getVehicles = createAsyncThunk("home/fetchVehicles", async () => {
	const response = await fetchVehicles();
	return response.data;
});

export const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		selectPlanet: (state, action) => {
			state.selectedPlanets = [...state.selectedPlanets, action.payload];
		},
		removePlanet: (state, action) => {
			state.selectedPlanets = state.selectedPlanets?.filter(
				(el) => el !== action.payload
			);
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getPlanets.pending, (state) => {
				state.planets = [];
				state.loading = true;
			})
			.addCase(getPlanets.fulfilled, (state, action) => {
				state.planets = action.payload;
				state.loading = false;
			})
			.addCase(getPlanets.rejected, (state) => {
				state.planets = [];
				state.loading = false;
			})
			.addCase(getVehicles.pending, (state) => {
				state.vehicles = [];
				state.loading = true;
			})
			.addCase(getVehicles.fulfilled, (state, action) => {
				state.vehicles = action.payload;
				state.loading = false;
			})
			.addCase(getVehicles.rejected, (state) => {
				state.vehicles = [];
				state.loading = false;
			});
	},
});

export const { selectPlanet, removePlanet } = homeSlice.actions;

export const getAllPlanets = (state) => state.home.planets;
export const getAllVehicles = (state) => state.home.vehicles;
export const getSelectedPlanets = (state) => state.home.selectedPlanets;

export default homeSlice.reducer;
