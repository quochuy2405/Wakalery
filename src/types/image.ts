export interface ImageType {
	resultId: number;
	photoId: number;
	userId: string;
	photoName: string;
	photo_directory: string;
	is_detected: boolean;
	modelId: number;
	modelName: string;
	description: string;
	tag: string;
	haveFace: boolean;
	faceOf: string;
	haveClothes: boolean;
	clothes: string;
	clothing: string;
	prospect: string;
	person: string;
	deepClothing: string;
	photoSerialId:string
}

export interface PhotoDirectory {
	photoSerialId: number;
	photoName: string;
	photoDirectory: string;
	userId: number;
	createAt: Date;
}
