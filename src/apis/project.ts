import { unauth } from "./axios";

export const getAllProjectByUserId = (id: string) => {
	return unauth().get(`/project/get-all/${id}`);
};



export const getAllMaterialtByProjectId = (uid:string,id: string) => {
	return unauth().get(`/photo/${uid}/${id}`);
};
export const getFavoriteByUserId = (uid:string) => {
	return unauth().get(`/project/get-favorite/${uid}`);
};
export const getDeletedByUserId = (uid:string) => {
	return unauth().get(`/project/get-deleted/${uid}`);
};