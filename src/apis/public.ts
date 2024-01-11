import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const getAllPublicPhoto = () => {
	return unauth().get(`/photo-public`);
};
export const getAllPubliByUserId = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/photo-public/${user.user_id}`);
};

type ApplyPhotoPublic = {
	photoName: string;
	sharers: Array<number>;
	hiddenMsg: string;
};
export const applyPhotoPublic = (data: ApplyPhotoPublic) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().put(`/photo/public`, { ...data, userId: user.user_id });
};
