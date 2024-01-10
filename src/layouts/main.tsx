import { Loading } from "@/components/atoms";
import AppProvider from "@/providers/AppProvider";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
	return (
		<AppProvider>
			<Outlet />
			<Loading />
		</AppProvider>
	);
};

export default LayoutMain;
