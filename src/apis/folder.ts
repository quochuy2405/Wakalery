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
	delDir: string;
};
export const deleteFolderFromDirectory = ({ delDir }: DeleteDirectory) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post(`/directory/delete`, {
		userId: user.user_id,
		delDir: delDir,
	});
};

type MoveDirectory = {
	oldDirectory: Array<string>;
	newDirectory: string;
};
export const moveFolderFromDirectory = ({ oldDirectory, newDirectory }: MoveDirectory) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().put(`/photo/move`, {
		userId: user.user_id,
		oldDirectory,
		newDirectory,
	});
};

export const getChildFolderByFolderParentId = (dirId: string) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/directory/get-child?userId=${user.user_id}&dirId=${dirId}`);
};
