import { Loading } from "@/components/atoms";
import AppProvider from "@/providers/AppProvider";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<AppProvider>
			<Outlet />
			<Loading />
		</AppProvider>
	);
};

export default AuthLayout;
