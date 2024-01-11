/* eslint-disable @typescript-eslint/no-explicit-any */
import { PngToBlob } from "@/utils/common";
import { unauth } from "./axios";
import { getUserInfoCookie } from "@/utils/cookies";

export const sendPrompt = (record: string) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post(`/promt-chat`, {
		userId: user.user_id,
		record,
	});
};
export const confirmPropmt = async (file: any, data?: object, canvas?: any) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	const form = new FormData();
	const blob = await PngToBlob(file.originFileObj, canvas);
	const fileCurrent = new File([blob], "crop_ai.png");
	form.append("files", fileCurrent as never);
	form.append("data", JSON.stringify(data));
	return unauth().post(`/promt-process-upload${user.user_id}`, form);
};
