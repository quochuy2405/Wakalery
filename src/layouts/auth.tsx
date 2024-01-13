import { Loading } from "@/components/atoms";
import AuthRedirect from "@/components/organims/AuthRedirect";
import AppProvider from "@/providers/AppProvider";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<AppProvider>
			<AuthRedirect />
			<Loading />
			<Outlet />
		</AppProvider>
	);
};

export default AuthLayout;
