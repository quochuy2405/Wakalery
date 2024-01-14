import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";
import { UserInfo } from "@/types/user";

export const getUserInfo = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get<UserInfo>(`/user/${user.user_id}`);
};
export type CreateAccountType = {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
};
export const createAccount = (data: CreateAccountType) => {
	return unauth().post(`/api/auth/register`, data);
};
export const updateProfile = (data: UserInfo) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().put(`/user/profile`, { userId: user.user_id, ...data });
};

type SettingUpdate = {
	isAutoBuildGnn?: boolean;
	isAutoDetectMaterial?: boolean;
	isAutoBuildAnn?: boolean;
	isUseChatBotAi?: boolean;
};
export const updateSetting = (data: SettingUpdate) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().put(`/user/setting`, { userId: user.user_id, ...data });
};

export type LoginAccountType = {
	password: string;
	email: string;
};

export const login = (data: LoginAccountType) => {
	return unauth().post(`/api/auth/login`, data);
};
