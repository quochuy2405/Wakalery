import { unauth } from "./axios";

export const getAllFolderByUserId = (id: string) => {
	return unauth().get(`/photo-directory/${id}`);
};

type CreateDirectory = {
	userId: number;
	newDir: string;
};

export const createFolderFromDirectory = ({ newDir, userId }: CreateDirectory) => {
	return unauth().post(`/directory/add`, {
		userId,
		newDir,
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
