import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for simulating loading with a delay
export const closeLoading = createAsyncThunk("users/loading", async () => {
	return await new Promise((resolve) => {
		setTimeout(() => {
			resolve(false as never);
		}, 700);
	});
});

// Initial state with status and entities
const initialState = false;

// Loading slice with reducers and extraReducers
export const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		startLoading: (state) => {
			state = true;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(closeLoading.fulfilled, (state) => {
			state = false;
			return state;
		});
	},
});

// Exporting actions and reducer
export const { startLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
