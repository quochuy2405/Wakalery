import { ImageType } from "@/types/image";
import { createSlice } from "@reduxjs/toolkit";
interface SearchProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: ImageType[];
}

const initialState: SearchProps = {
	data: [],
};
export const searchSlice = createSlice({
	name: "Search",
	initialState,
	reducers: {
		setSearch: (state, { payload }) => {
			state.data = payload;
			return state;
		},
		clearSearch: () => {
			return initialState;
		},
	},
});

export const { setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
