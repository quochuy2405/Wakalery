import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const getGraphRNN = async () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return await unauth().get(`/graph-gnn/${user.user_id}`);
};
