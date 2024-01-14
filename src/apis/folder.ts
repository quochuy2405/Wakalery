import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const getAllFolderByUserId = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/photo-directory/${user.user_id}`);
};

type CreateDirectory = {
	folderName: string;
	projectId: number;
	folderId: number;
};

export const createFolderByParentyId = ({ folderName, projectId, folderId }: CreateDirectory) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post(`/directory/add`, {
		userId: user.user_id,
		newDir: folderName,
		projectId,
		folderId,
	});
};
type DeleteDirectory = {
	type: "FOLDER" | "IMAGE";
	fileId: number;
};
export const deleteFolderOrImage = ({ fileId, type }: DeleteDirectory) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post(`/directory/delete`, {
		userId: user.user_id,
		fileId,
		type,
	});
};

export type MoveDirectory = {
	type: "FOLDER" | "PHOTO";
	fileId: number;
	oldProjectId: number;
	oldFolderId: number;
	newProjectId: number;
	newFolderId: number;
};
export const moveFolderFromDirectory = (data: MoveDirectory) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().put(`/directory/move`, {
		userId: user.user_id,
		...data,
	});
};
