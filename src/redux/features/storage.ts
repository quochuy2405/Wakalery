import { UserInfo } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
const initialState: UserInfo = {
	userSerialId: 0,
	firstName: "",
	lastName: "",
	avatar: "",
	usedDisk: 0,
	availableDisk: 0,
	joinAt: null,
	isActive: false,
	accountSerialId: 0,
};
export const storageSlice = createSlice({
	name: "storage",
	initialState,
	reducers: {
		setStorage: (state, { payload }) => {
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
			state.avatar = payload.avatar;
			state.usedDisk = payload.usedDisk;
			state.availableDisk = payload.availableDisk;
			state.joinAt = payload.joinAt;
			state.isActive = payload.isActive;
			state.accountSerialId = payload.accountSerialId;
			return state;
		},
		resetStorage: (state) => {
			state.firstName = initialState.firstName;
			state.lastName = initialState.lastName;
			state.avatar = initialState.avatar;
			state.usedDisk = initialState.usedDisk;
			state.availableDisk = initialState.availableDisk;
			state.joinAt = initialState.joinAt;
			state.isActive = initialState.isActive;
			state.accountSerialId = initialState.accountSerialId;
			return state;
		},
	},
});

export const { setStorage, resetStorage } = storageSlice.actions;
export default storageSlice.reducer;
