import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";
export const getDeletedByUserId = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/project/get-deleted/${user.user_id}`);
};
type RecoveryMarterialType = {
	type: string;
	fileId: number;
};
export const recoveryMaterial = (data: RecoveryMarterialType) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post(`/directory/recovery`, {
		userId: user.user_id,
		...data,
	});
};
