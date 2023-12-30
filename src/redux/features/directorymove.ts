import { getObjectByPath } from "@/utils/common";
import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
	currentPath: "/",
	directoriesTree: {},
	directoriesCurrent: {},
};

export const directoryMoveSlice = createSlice({
	name: "directoryMove",
	initialState,
	reducers: {
		setDirectoryMove: (state, { payload }) => {
			state.currentPath = payload;
			const newTree = getObjectByPath(
				state.currentPath,
				state.directoriesCurrent
			);
			if (newTree) state.directoriesTree = newTree;
			return state;
		},

		pushDirectoryMove: (state, { payload }) => {
			if (state.currentPath === "/") {
				state.currentPath = payload;
				const newTree = getObjectByPath(
					state.currentPath,
					state.directoriesCurrent
				);
				if (newTree) state.directoriesTree = newTree;
				return state;
			}

			state.currentPath = state.currentPath + `/${payload}`;
			const newTree = getObjectByPath(
				state.currentPath,
				state.directoriesCurrent
			);
			if (newTree) state.directoriesTree = newTree;
			return state;
		},
		setDirectoriesTree: (state, { payload }) => {
			state.directoriesTree = payload;
			return state;
		},
		removeDirectoryMove: (state, { payload }) => {
			state.currentPath = state.currentPath.replace(`/${payload}`, "");
			const newTree = getObjectByPath(
				state.currentPath,
				state.directoriesCurrent
			);
			if (newTree) state.directoriesTree = newTree;
			return state;
		},
		setDirectoriesCurrent: (state, { payload }) => {
			state.directoriesCurrent = payload;
			state.directoriesTree = payload;
			return state;
		},
		clearDirectoryMove: (state) => {
			state.currentPath = "/";
			const newTree = getObjectByPath(
				state.currentPath,
				state.directoriesCurrent
			);
			if (newTree) state.directoriesTree = newTree;
			return state;
		},
	},
});

export const {
	clearDirectoryMove,
	setDirectoryMove,
	pushDirectoryMove,
	removeDirectoryMove,
	setDirectoriesTree,
	setDirectoriesCurrent,
} = directoryMoveSlice.actions;
export default directoryMoveSlice.reducer;
