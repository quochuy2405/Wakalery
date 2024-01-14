import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	train: false,
	allow: false,
};
export const detectSlice = createSlice({
	name: "detect",
	initialState: initialState,
	reducers: {
		startTrain: (state) => {
			state.train = true;
			return state;
		},
		closeTrain: (state) => {
			state.train = false;
			return state;
		},
		setAllowGNN: (state, { payload }) => {
			state.allow = payload;
			return state;
		},
	},
});

export const { startTrain, closeTrain, setAllowGNN } = detectSlice.actions;
export default detectSlice.reducer;
