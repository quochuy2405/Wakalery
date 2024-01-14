import { getUserInfoCookie } from "@/utils/cookies";
import { unauth } from "./axios";

export const getAllProjectByUserId = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/project/get-all/${user.user_id}`);
};

export const createNewProject = ({ projectName }: { projectName: string }) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().post("/project/save", { projectName, userId: user.user_id });
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
	projectId: number;
	folderId: number;
	size: number;
	page: number;
};
export const getChildByProjectId = ({ projectId, folderId, size = 20, page = 0 }: ChildQuery) => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";

	return unauth().get(`/directory/get-child`, {
		params: {
			userId: user.user_id,
			projectId,
			folderId,
			size,
			page,
		},
	});
};
export const getFavoriteByUserId = () => {
	const user = getUserInfoCookie();
	if (!user) throw "user not define";
	return unauth().get(`/project/get-favorite/${user.user_id}`);
};

type BreadcrumbType = {
	projectId: number;
	folderId: number;
};
export const getBreadcrumb = ({ folderId, projectId }: BreadcrumbType) => {
	return unauth().get(`/breadcrumb/${projectId}/${folderId}`);
};
