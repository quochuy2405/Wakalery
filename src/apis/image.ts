import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";
import { UploadFile } from "antd";

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
	return await unauth().get(`/photo/detail/${photoName}`);
};

export const getImageDetailsPublic = async (photoName: string) => {
	return await unauth().get(`/photo/detail/${photoName}`);
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
export const getCheckSteg = async (files: UploadFile[]) => {
	const form = new FormData();
	for (const file of files) {
		form.append("files", file.originFileObj as never);
	}
	return await unauth().post(`/check-steg`, form);
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

export const getSimilarByUpload = (file: File) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	const form = new FormData();

	form.append("file", file);
	return unauth().post(`/similar-images/detect-upload/${user.user_id}`, form);
};
