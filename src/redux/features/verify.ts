import { createSlice } from "@reduxjs/toolkit";
type VerifyType = {
	status: "start" | "completed" | "already" | "close";
};
const initialState: VerifyType = {
	status: "start",
};
export const verifySlice = createSlice({
	name: "verify",
	initialState,
	reducers: {
		startVerify: (state) => {
			state.status = "start";
			return state;
		},
		setVerify: (state, { payload }) => {
			state.status = payload;
			return state;
		},
		closeVerify: (state) => {
			state.status = "close";
			return state;
		},
	},
});

export const { startVerify, setVerify, closeVerify } = verifySlice.actions;
export default verifySlice.reducer;
