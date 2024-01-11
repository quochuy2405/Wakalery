import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";
type DecodeStegParams = {
	photoName: string;
};
export const getDecodeSteg = async ({ photoName }: DecodeStegParams) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().get(`/decode-steg-image/${photoName}/${user.user_id}`);
};
