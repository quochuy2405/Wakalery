import { getObjectByPath } from "@/utils/common";
import { createSlice } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
	currentPath: "/",
	directoriesTree: {},
	directoriesCurrent: {},
};

export const directorySlice = createSlice({
	name: "directory",
	initialState,
	reducers: {
		setDirectory: (state, { payload }) => {
			state.currentPath = payload;
			const newTree = getObjectByPath(
				state.currentPath,
				state.directoriesCurrent
			);
			if (newTree) state.directoriesTree = newTree;
			return state;
		},

		pushDirectory: (state, { payload }) => {
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
		removeDirectory: (state, { payload }) => {
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
		clearDirectory: (state) => {
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
	clearDirectory,
	setDirectory,
	pushDirectory,
	removeDirectory,
	setDirectoriesTree,
	setDirectoriesCurrent,
} = directorySlice.actions;
export default directorySlice.reducer;
