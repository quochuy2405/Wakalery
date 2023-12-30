import { UploadFile } from "antd";
import { unauth } from "./axios";

export const sendPrompt = (record: string) => {
	return unauth().post(`/promt-chat`, {
		userId: 1,
		record,
	});
};
export const confirmPropmt = (file: UploadFile, data: object) => {
	const form = new FormData();
	form.append("files", file.originFileObj as never);
	form.append("data", JSON.stringify(data));
	return unauth().post(`/promt-process-upload/1`, form);
};
