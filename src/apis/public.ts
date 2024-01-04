import { unauth } from "./axios";

export const getAllPublicPhoto = () => {
	return unauth().get(`/photo-public`);
};

type ApplyPhotoPublic = {
	userId: string;
	photoName: string;
	sharers: Array<number>;
	hiddenMsg: string;
};
export const applyPhotoPublic = (data: ApplyPhotoPublic) => {
	return unauth().put(`/photo/public`, data);
};
