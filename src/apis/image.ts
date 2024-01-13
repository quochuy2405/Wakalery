import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const getImageByTagsMatchAll = async (tags: Array<string>) => {
	return await unauth().post("results/findByTagsAll", { tags });
};
export const getImageByTagsContains = async (tags: Array<string>) => {
	return await unauth().post("results/findByTagsIn", { tags });
};

export const getImageAll = async () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().get(`/photo/${user.user_id}`);
};

export const getImageDetails = async (photoName: string) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().get(`/photo/detail/${user.user_id}/${photoName}`);
};

export const getImageDetailsPublic = async (photoName: string) => {
	return await unauth().get(`/photo/detail/public/${photoName}`);
};

export const getCroppedPhoto = async () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().get(`/cropped-photo/${user.user_id}`);
};

export const getImageSimilar = async (photoName: string) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().get(`/similar-images/detect/${user.user_id}/${photoName}`);
};

export const getImageSimilarPublic = async (photoName: string) => {
	return await unauth().get(`/similar-images/detect/public/${photoName}`);
};
type DeletePhotoModelListItem = {
	photoId: number;
};
export const updateImage = (data: { deletePhotoModelList: Array<DeletePhotoModelListItem> }) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	const deletePhotoModelList = data.deletePhotoModelList.map((item) => {
		return { ...item, userId: user.user_id };
	});
	return unauth().put("photo/delete", { deletePhotoModelList });
};
