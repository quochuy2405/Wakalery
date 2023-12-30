/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export const moveSlice = createSlice({
	name: "filemove",
	initialState: [],
	reducers: {
		setFileMove: (state, { payload }) => {
			state = payload;
			return state;
		},
		addFileMove: (state: any, { payload }) => {
			state = [...new Set([...state, payload])];
			return state;
		},
		removeFileMove: (state: any, { payload }) => {
			state = state.filter((item: string) => item !== payload);
			return state;
		},
		clearFileMove: (state) => {
			state = [];
			return state;
		},
	},
});

export const { setFileMove, clearFileMove, addFileMove, removeFileMove } = moveSlice.actions;
export default moveSlice.reducer;
