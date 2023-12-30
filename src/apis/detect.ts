import { unauth } from "./axios";

export const cropFaces = (id: string) => {
	return unauth().get(`/crop-face/${id}`);
};

export const prepareDataGraphGNN = (id: string) => {
	return unauth().get(`/build-graph-gnn/${id}`);
};

export const buildGraphGNN = (id: string) => {
	return unauth().get(`/train-gnn/${id}`);
};


