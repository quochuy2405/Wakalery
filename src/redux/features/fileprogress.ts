import { createSlice } from "@reduxjs/toolkit";
import { UploadFile } from "antd";
type FileProgressType = {
	files: UploadFile<any>[];
	isShowModel: boolean;
	progress: number;
};
const initialState: FileProgressType = {
	files: [],
	isShowModel: false,
	progress: 0,
};
export const fileProgressSlice = createSlice({
	name: "fileProgress",
	initialState,
	reducers: {
		setFiles: (state, { payload }) => {
			state.files = payload.files;
			return state;
		},
		setProgress: (state, { payload }) => {
			state.progress = payload;
			return state;
		},
		openModelFiles: (state) => {
			state.isShowModel = true;
			return state;
		},
		closeModelFiles: (state) => {
			state.isShowModel = false;
			state.files = [];
			state.progress = 0;
			console.log("state", state);
			return state;
		},
	},
});

export const { setFiles, openModelFiles, closeModelFiles, setProgress } =
	fileProgressSlice.actions;
export default fileProgressSlice.reducer;
