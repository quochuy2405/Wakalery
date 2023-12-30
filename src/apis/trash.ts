import { unauth } from "./axios";

export const getTrashFile = async () => {
	return await unauth().get(`/similar-images/detect-upload`);
};
