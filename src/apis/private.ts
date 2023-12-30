import { unauth } from "./axios";

export const getPrivateFiles = async () => {
	return await unauth().get(`/similar-images/detect-upload`);
};
