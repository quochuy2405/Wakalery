import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const cropFaces = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/crop-face/${user.user_id}`);
};

export const prepareDataGraphGNN = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/build-graph-gnn/${user.user_id}`);
};

export const buildGraphGNN = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/train-gnn/${user.user_id}`);
};
