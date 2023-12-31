import { unauth } from "./axios";

export const getAllPublicPhoto = () => {
	return unauth().get(`/photo-public`);
};
