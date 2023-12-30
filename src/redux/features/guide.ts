import { createSlice } from "@reduxjs/toolkit";

export const guideSlice = createSlice({
	name: "guide",
	initialState: false,
	reducers: {
		startGuide: (state) => {
			state = true;
			return state;
		},
		closeGuide: (state) => {
			state = false;
			return state;
		},
	},
});

export const { startGuide, closeGuide } = guideSlice.actions;
export default guideSlice.reducer;
