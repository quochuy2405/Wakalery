import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import {
	Analytics,
	Discovery,
	Error,
	Favorites,
	Info,
	LandingPage,
	Login,
	Materials,
	PreviewProject,
	PreviewImage,
	Profile,
	Project,
	Recycle,
	SearchResult,
	Settings,
	SignUp,
	UploadImage,
	Works,
	PublicManage,
} from "./pages";
import "./styles/global.css";
import MainLayout from "./layouts/main";
const router = createBrowserRouter([
	{
		path: "",
		element: <MainLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
				errorElement: <Error />,
			},
			{
				path: "/discovery",
				element: <Discovery />,
				errorElement: <Error />,
			},

			{
				path: "/upload",
				element: <Analytics />,
				errorElement: <Error />,
			},

			{
				path: "/upload-public",
				element: <UploadImage />,
				errorElement: <Error />,
			},
			{
				path: "/login",
				element: <Login />,
				errorElement: <Error />,
			},
			{
				path: "/signup",
				element: <SignUp />,
				errorElement: <Error />,
			},
			{
				path: "/info",
				element: <Info />,
				errorElement: <Error />,
			},
			{
				path: "/discovery/preview",
				element: <PreviewImage />,
				errorElement: <Error />,
			},
		],
	},
	{
		path: "/works",
		element: <AuthLayout />,
		children: [
			{
				index: true,
				path: "",
				element: <Works />,
				errorElement: <Error />,
			},
			{
				path: "/works/public-manage",
				element: <PublicManage />,
				errorElement: <Error />,
			},
			{
				path: "/works/project/preview",
				element: <PreviewProject />,
				errorElement: <Error />,
			},
			{
				path: "/works/project/search",
				element: <SearchResult />,
				errorElement: <Error />,
			},
			{
				path: "/works/project/:projectId",
				element: <Project />,
				errorElement: <Error />,
			},
			{
				path: "/works/project/:projectId/:userDirectoryId",
				element: <Materials />,
				errorElement: <Error />,
			},
			{
				path: "/works/upload",
				element: <UploadImage />,
				errorElement: <Error />,
			},
			{
				path: "/works/favorites",
				element: <Favorites />,
				errorElement: <Error />,
			},
			{
				path: "/works/recycle",
				element: <Recycle />,
				errorElement: <Error />,
			},
			{
				path: "/works/analytics",
				element: <Analytics />,
				errorElement: <Error />,
			},
			{
				path: "/works/favories",
				element: <Analytics />,
				errorElement: <Error />,
			},
			{
				path: "/works/settings",
				element: <Settings />,
				errorElement: <Error />,
			},
			{
				path: "/works/profile",
				element: <Profile />,
				errorElement: <Error />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
