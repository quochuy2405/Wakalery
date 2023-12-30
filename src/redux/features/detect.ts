import { createSlice } from "@reduxjs/toolkit";

export const detectSlice = createSlice({
	name: "detect",
	initialState: false,
	reducers: {
		startTrain: (state) => {
			state = true;
			return state;
		},
		closeTrain: (state) => {
			state = false;
			return state;
		},
	},
});

export const { startTrain, closeTrain } = detectSlice.actions;
export default detectSlice.reducer;
