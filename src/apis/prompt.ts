/* eslint-disable @typescript-eslint/no-explicit-any */
import { PngToBlob } from "@/utils/common";
import { unauth } from "./axios";

export const sendPrompt = (record: string) => {
	return unauth().post(`/promt-chat`, {
		userId: 1,
		record,
	});
};
export const confirmPropmt = async (file: any, data?: object, canvas?: any) => {
	const form = new FormData();
	const blob = await PngToBlob(file.originFileObj, canvas);
	const fileCurrent = new File([blob],'crop_ai.png')
	form.append("files", fileCurrent as never);
	form.append("data", JSON.stringify(data));
	return unauth().post(`/promt-process-upload/1`, form);
};
