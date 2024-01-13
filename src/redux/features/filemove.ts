/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhotoDirectory } from "@/types/image";
import { createSlice } from "@reduxjs/toolkit";
const initialState: Array<PhotoDirectory> = [];
export const moveSlice = createSlice({
	name: "filemove",
	initialState,
	reducers: {
		setFileMove: (state, { payload }) => {
			state = payload;
			return state;
		},
		addFileMove: (state, { payload }) => {
			state = [...new Set([...state, payload])];
			console.log("data", state);
			return state;
		},
		removeFileMove: (state, { payload }) => {
			state = state.filter((item) => JSON.stringify(item) !== JSON.stringify(payload));
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
