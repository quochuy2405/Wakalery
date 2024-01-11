import { UploadFile } from "antd";
import { unauth } from "./axios";
import { getUserInfoCookie } from "@/utils/cookies";

export const getImageByFaces = (faces: Array<string>) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post(`/face-detect/${user.user_id}`, {
		croppedPhotoName: faces,
	});
};

export const getImageByFaceUpload = (files: UploadFile[]) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	const form = new FormData();
	for (const file of files) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form.append("files", file.originFileObj as any);
	}
	return unauth().post(`/face-detect/upload/${user.user_id}`, form);
};

export const getImageByFaceUploadCropAI = (file: File) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	const form = new FormData();

	form.append("files", file);

	return unauth().post(`/face-detect/upload/${user.user_id}`, form);
};
