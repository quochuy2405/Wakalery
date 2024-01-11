import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const getUserInfo = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/user/${user.user_id}`);
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

export type LoginAccountType = {
	password: string;
	email: string;
};

export const login = (data: LoginAccountType) => {
	return unauth().post(`/api/auth/login`, data);
};
