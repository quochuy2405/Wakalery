"use client";
import { store } from "@/redux/store";
import "@/styles/global.css";
import { ConfigProvider } from "antd";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

interface AppProviderProps {
	children: ReactElement | ReactNode;
}
const configThemes = {
	token: {
		colorPrimary: "#00b96b",
		borderRadius: 6,
	},
	components: {
		Button: {
			// colorPrimary: "#00b96b",
			algorithm: true, // Enable algorithm
			primaryColor: "#00b96b",
			primaryBg: "#00b96b",
		},
		Input: {
			colorPrimary: "#eb2f96",
			algorithm: true, // Enable algorithm
		},
		Layout: {
			siderBg: "white",
		},
		Menu: {
			itemPaddingInline: 0,
		},
	},
};
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<ConfigProvider theme={configThemes}>{children}</ConfigProvider>
		</Provider>
	);
};

export default AppProvider;
