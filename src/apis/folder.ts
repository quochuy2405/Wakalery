import { unauth } from "./axios";

export const getAllFolderByUserId = (id: string) => {
	return unauth().get(`/photo-directory/${id}`);
};

type CreateDirectory = {
	userId: number;
	folderName: string;
	projectId: number;
	folderId: number;
};

export const createFolderByParentyId = ({
	folderName,
	userId,
	projectId,
	folderId,
}: CreateDirectory) => {
	return unauth().post(`/directory/add`, {
		userId,
		newDir: folderName,
		projectId,
		folderId,
	});
};
type DeleteDirectory = {
	userId: number;
	delDir: string;
};
export const deleteFolderFromDirectory = ({ delDir, userId }: DeleteDirectory) => {
	return unauth().post(`/directory/delete`, {
		userId,
		delDir: delDir,
	});
};

type MoveDirectory = {
	userId: number;
	oldDirectory: Array<string>;
	newDirectory: string;
};
export const moveFolderFromDirectory = ({ oldDirectory, newDirectory, userId }: MoveDirectory) => {
	return unauth().put(`/photo/move`, {
		userId,
		oldDirectory,
		newDirectory,
	});
};

export const getChildFolderByFolderParentId = (uid: string, dirId: string) => {
	return unauth().get(`/directory/get-child?userId=${uid}&dirId=${dirId}`);
};
