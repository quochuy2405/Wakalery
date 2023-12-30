import { unauth } from "./axios";

export const getImageByTagsMatchAll = async (tags: Array<string>) => {
	return await unauth().post("results/findByTagsAll", { tags });
};
export const getImageByTagsContains = async (tags: Array<string>) => {
	return await unauth().post("results/findByTagsIn", { tags });
};

export const getImageAll = async (uid: string) => {
	return await unauth().get(`/photo/${uid}`);
};

export const getImageDetails = async (uid: string,photoName:string) => {
	return await unauth().get(`/photo/detail/${uid}/${photoName}`);
};

export const getCroppedPhoto = async (uid: string) => {
	return await unauth().get(`/cropped-photo/${uid}`);
};

export const getImageSimilar = async (uid:string,photoName: string) => {
	return await unauth().get(`/similar-images/detect/${uid}/${photoName}`);
};