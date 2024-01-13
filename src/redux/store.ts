import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import detect from "./features/detect";

import auth from "./features/cookie";
import filemove from "./features/filemove";
import fileprogress from "./features/fileprogress";
import graphedges from "./features/graphedges";
import guide from "./features/guide";
import loading from "./features/loading";
import onmove from "./features/onmove";
import project from "./features/project";
import robot from "./features/robot";
import search from "./features/search";
import storage from "./features/storage";
import verify from "./features/verify";

export const store = configureStore({
	reducer: {
		loading,
		fileprogress,
		storage,
		detect,
		graphedges,
		onmove,
		guide,
		filemove,
		robot,
		project,
		search,
		verify,
		auth,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
