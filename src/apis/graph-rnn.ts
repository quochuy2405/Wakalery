import { unauth } from "./axios";

export const getGraphRNN = async (uid: string) => {
	return await unauth().get(`/graph-gnn/${uid}`);
};
