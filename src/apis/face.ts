import { UploadFile } from "antd";
import { unauth } from "./axios";

export const getImageByFaces = (id: string, faces: Array<string>) => {
	return unauth().post(`/face-detect/${id}`, {
		croppedPhotoName: faces,
	});
};

export const getImageByFaceUpload = (id: string, files: UploadFile[]) => {
	const form = new FormData();
	for (const file of files) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form.append("files", file.originFileObj as any);
	}
	return unauth().post(`/face-detect/upload/${id}`, form);
};

export const getImageByFaceUploadCropAI = (id: string, file: File) => {
	const form = new FormData();

	form.append("files", file);

	return unauth().post(`/face-detect/upload/${id}`, form);
};
