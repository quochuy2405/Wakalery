import { unauth } from "./axios";

export const getAllProjectByUserId = (id: string) => {
	return unauth().get(`/project/get-all/${id}`);
};

export const createNewProject = ({
	projectName,
	userId,
}: {
	projectName: string;
	userId: string;
}) => {
	return unauth().post("/project/save", { projectName, userId });
};

export const updateProject = (data: {
	projectId: number;
	projectName: string;
	favorite: boolean;
	deleted: boolean;
}) => {
	return unauth().put("/project/update", data);
};

type ChildQuery = {
	userId: string;
	projectId: string;
	folderId: string;
};
export const getChildByProjectId = ({ userId, projectId, folderId }: ChildQuery) => {
	return unauth().get(
		`/directory/get-child?userId=${userId}&projectId=${projectId}&folderId=${folderId}`
	);
};
export const getFavoriteByUserId = (uid: string) => {
	return unauth().get(`/project/get-favorite/${uid}`);
};
export const getDeletedByUserId = (uid: string) => {
	return unauth().get(`/project/get-deleted/${uid}`);
};
