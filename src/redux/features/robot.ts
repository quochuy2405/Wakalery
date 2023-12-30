import { createSlice } from "@reduxjs/toolkit";
interface RobotProps {
	title: string;
	body: string;
	submit: (data: object) => void;
	show: boolean;
}

const initialState: RobotProps = {
	title: "",
	body: "",
	submit: () => 1,
	show: false,
};
export const robotSlice = createSlice({
	name: "robot",
	initialState,
	reducers: {
		setRobot: (state, { payload }) => {
			state.body = payload.body;
			state.show = payload.show;
			state.submit = payload.submit;
			state.title = payload.title;
			return state;
		},
		closeRobot: () => {
			return initialState;
		},
	},
});

export const { setRobot, closeRobot } = robotSlice.actions;
export default robotSlice.reducer;
