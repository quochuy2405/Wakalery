/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
type Graph = {
	data: {
		nodes: Array<any>;
		edges: Array<any>;
	};
	show: boolean;
};

const initialState: Graph = {
	data: {
		nodes: [],
		edges: [],
	},
	show: false,
};
export const graphedgesSlice = createSlice({
	name: "graphedges",
	initialState,
	reducers: {
		setGraphEdges: (state, { payload }) => {
			state.data = payload.data;
			state.show = true;
			return state;
		},
		closeGraphEdges: (state) => {
			state.show = false;
			state.data = initialState.data;
			return state;
		},
	},
});

export const { setGraphEdges, closeGraphEdges } = graphedgesSlice.actions;
export default graphedgesSlice.reducer;
