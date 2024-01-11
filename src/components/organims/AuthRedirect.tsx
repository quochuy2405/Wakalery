import { RootState } from "@/redux/store";
import { getUserInfoCookie } from "@/utils/cookies";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
	const navigate = useNavigate();
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	useEffect(() => {
		const user = getUserInfoCookie();
		if (!user) navigate("/login");
	}, [navigate, token]);
	return <></>;
};

export default AuthRedirect;
