import { getSessionWithExpiry } from "@/utils/session";
import { unauth } from "./axios";

export const refreshAccessToken = async () => {
	const access_token = await getSessionWithExpiry("session-auth");
	const response = await unauth().post("refresh_token", {
		access_token,
	});
	if (response?.data?.access_token) return response.data.access_token;
	return null;
};
