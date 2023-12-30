import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import detect from "./features/detect";
import directory from "./features/directory";
import directorymove from "./features/directorymove";
import fileprogress from "./features/fileprogress";
import graphedges from "./features/graphedges";
import loading from "./features/loading";
import onmove from "./features/onmove";
import storage from "./features/storage";
import guide from "./features/guide";
import filemove from "./features/filemove";

export const store = configureStore({
	reducer: {
		directory,
		directorymove,
		loading,
		fileprogress,
		storage,
		detect,
		graphedges,
		onmove,
		guide,
		filemove,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
