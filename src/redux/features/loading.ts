import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
	name: "loading",
	initialState: false,
	reducers: {
		startLoading: (state) => {
			state = true;
			return state;
		},
		closeLoading: (state) => {
			state = false;
			return state;
		},
	},
});

export const { startLoading, closeLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
