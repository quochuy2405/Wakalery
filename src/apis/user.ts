import { unauth } from "./axios";

export const getUserInfo = (userId: string) => {
	return unauth().get(`/user/${userId}`);
};
