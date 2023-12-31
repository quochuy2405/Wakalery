import { createSlice } from "@reduxjs/toolkit";
interface ProjectProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}

const initialState: ProjectProps = {
	data: [],
};
export const ProjectSlice = createSlice({
	name: "Project",
	initialState,
	reducers: {
		setProject: (state, { payload }) => {
			state.data = payload;
			return state;
		},
		clearProject: () => {
			return initialState;
		},
	},
});

export const { setProject, clearProject } = ProjectSlice.actions;
export default ProjectSlice.reducer;
