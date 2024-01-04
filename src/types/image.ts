export interface ImageType {
	result_id: number;
	photo_id: number;
	user_id: string;
	photo_name?: string;
	photoName?: string;
	photo_directory: string;
	is_detected: boolean;
	model_id: number;
	model_name: string;
	description: string;
	tag: string;
	have_face: boolean;
	face_of: string;
	have_clothes: boolean;
	clothes: string;
	clothing: string;
	prospect: string;
	person: string;
	deep_clothing: string;
	photo_serialId: string;
}

export interface PhotoDirectory {
	photoSerialId: number;
	photoName: string;
	photoDirectory: string;
	userId: number;
	createAt: Date;
	isFolder?: boolean;
	favorite?: boolean;
}
