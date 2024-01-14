import { RootState } from "@/redux/store";
import { getUserInfoCookie } from "@/utils/cookies";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const AuthRedirect = () => {
	const navigate = useNavigate();
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	const user = getUserInfoCookie();

	useEffect(() => {
		const user = getUserInfoCookie();
		if (!user?.user_id) navigate("/login");
  }, [navigate, token]);
	if (!user?.user_id) return <Navigate to={"/login"} />;
	return <></>;
};

export default AuthRedirect;
