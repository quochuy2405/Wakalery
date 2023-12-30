import { UploadFile } from "antd";
import { unauth } from "./axios";

export const uploadFiles = async (
	files: UploadFile[],
	progressUpload: (percent: number) => void
) => {
	const form = new FormData();
	for (const file of files) {
		form.append("files", file.originFileObj as never);
	}
	const response = await unauth().post("/upload/1", form, {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onUploadProgress: (progressEvent: any) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			progressUpload(percentCompleted);
		},
	});
	return response;
};

export const getImageSimilarUpload = async (uid: string, file: UploadFile) => {
	const form = new FormData();

	form.append("file", file.originFileObj as never);

	return await unauth().post(`/similar-images/detect-upload/${uid}`, form);
};
