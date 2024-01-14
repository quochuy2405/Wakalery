import { getUserInfo } from "@/apis/user";
import { setAllowGNN } from "@/redux/features/detect";
import { RootState } from "@/redux/store";
import { UserInfo } from "@/types/user";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const [user, setUser] = useState<UserInfo>();
	useEffect(() => {
		getUserInfo()
			.then(({ data }) => {
				setUser(data);
				dispatch(setAllowGNN(data.isAutoBuildGnn));
			})
			.catch((e) => {
				console.log("e", e);
			});
	}, [token]);
	return (
		<div className='flex gap-2 items-center'>
			<Avatar
				size={"small"}
				alt={user?.firstName}
				src={`https://ui-avatars.com/api/?name=${user?.firstName}&background=0D8ABC&color=fff`}
			/>
			<p className='text-xs'>{user?.firstName}</p>
		</div>
	);
};

export default UserInfo;
