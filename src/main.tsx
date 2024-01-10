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
} from "./pages";
import "./styles/global.css";
const router = createBrowserRouter([
	{
		path: "",
		element: <AuthLayout />,
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
				path: "/analytics",
				element: <Analytics />,
				errorElement: <Error />,
			},
			{
				path: "/favories",
				element: <Analytics />,
				errorElement: <Error />,
			},
			{
				path: "/upload",
				element: <Analytics />,
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
				path: "/profile",
				element: <Profile />,
				errorElement: <Error />,
			},
			{
				path: "/settings",
				element: <Settings />,
				errorElement: <Error />,
			},
			{
				path: "/discovery/preview",
				element: <PreviewImage />,
				errorElement: <Error />,
			},
			{
				path: "/works",
				element: <Works />,
				errorElement: <Error />,
			},
			{
				path: "/project/preview",
				element: <PreviewProject />,
				errorElement: <Error />,
			},
			{
				path: "/project/search",
				element: <SearchResult />,
				errorElement: <Error />,
			},
			{
				path: "/works/project/:projectId",
				element: <Project />,
				errorElement: <Error />,
			},
			{
				path: "/works/project/:projectId/*",
				element: <Materials />,
				errorElement: <Error />,
			},
			{
				path: "/upload",
				element: <UploadImage />,
				errorElement: <Error />,
			},
			{
				path: "/favorites",
				element: <Favorites />,
				errorElement: <Error />,
			},
			{
				path: "/recycle",
				element: <Recycle />,
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
