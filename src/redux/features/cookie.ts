import { cookieAuthHandles } from "@/utils/cookies";
import { createSlice } from "@reduxjs/toolkit";
type TokenType = {
	cookie: {
		token: string | null;
	};
};
const initialState: TokenType = {
	cookie: {
		token: null,
	},
};
export const TokenSlice = createSlice({
	name: "Token",
	initialState,
	reducers: {
		initToken: (state) => {
			state.cookie.token = cookieAuthHandles.get();
			return state;
		},
		clearCookie: (state) => {
			state.cookie.token = null;
			return state;
		},
	},
});

export const { initToken, clearCookie } = TokenSlice.actions;
export default TokenSlice.reducer;
