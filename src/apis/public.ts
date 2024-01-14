import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";
import { ImageType } from "@/types/image";
type PublicPhoto = {
	size: number;
	page: number;
};
export const getAllPublicPhoto = (data: PublicPhoto) => {
	return unauth().get(`/photo-public`, { params: data });
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
export const unPublic = async (image: ImageType) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().put(
		`/photo/un-public/${user.user_id}/${image.photoSerialId}/${image.photoName}`
	);
};
