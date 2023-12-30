import AppProvider from "@/providers/AppProvider";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
	return (
		<AppProvider>
			<Outlet />
	
		</AppProvider>
	);
};

export default LayoutMain;
