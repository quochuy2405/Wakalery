import { unauth } from "./axios";
type DecodeStegParams = {
	userId: number;
	photoName: string;
};
export const getDecodeSteg = async ({ userId, photoName }: DecodeStegParams) => {
	return await unauth().get(`/decode-steg-image/${photoName}/${userId}`);
};
