import { RootState } from "@/redux/store";
import { getUserInfoCookie } from "@/utils/cookies";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	const [user, setUser] = useState(getUserInfoCookie());
	useEffect(() => {
		const currentUser = getUserInfoCookie();
		setUser(currentUser);
	}, [token]);
	return (
		<div className='flex gap-2 items-center'>
			<Avatar
				size={"small"}
				alt={user?.first_name}
				src={`https://ui-avatars.com/api/?name=${user?.first_name}&background=0D8ABC&color=fff`}
			/>
			<p className='text-xs'>{user?.first_name}</p>
		</div>
	);
};

export default UserInfo;
