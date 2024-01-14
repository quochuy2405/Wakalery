import { getUserInfoCookie } from "@/utils/cookies";
import { UploadFile } from "antd";
import { unauth } from "./axios";

export const uploadFiles = async (
	files: UploadFile[],
	projectId: number,
	folderId: number,
	StegData: Array<object>,
	progressUpload: (percent: number) => void
) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	const form = new FormData();
	for (const file of files) {
		form.append("files", file.originFileObj as never);
	}
	if (StegData.length) {
		form.append("check-steg", JSON.stringify(StegData));
	}

	const response = await unauth().post(`/upload/${user.user_id}/${projectId}/${folderId}`, form, {
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
