import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
export type RobotType = {
	title: string;
	body: ReactNode;
	submit?: (data: object) => void;
	show?: boolean;
	type?: "face" | "record";
};

const initialState: RobotType = {
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
			state.body = payload?.body;
			state.show = payload?.show;
			state.submit = payload?.submit;
			state.title = payload?.title;
			state.type = payload?.type;
			return state;
		},
		resetRobot: () => {
			return initialState;
		},
	},
});

export const { setRobot, resetRobot } = robotSlice.actions;
export default robotSlice.reducer;
