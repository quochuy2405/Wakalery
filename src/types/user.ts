export interface UserInfo {
	userSerialId: number;
	firstName: string;
	lastName: string;
	avatar: string;
	usedDisk: number;
	availableDisk: number;
	joinAt: Date | null;
	isActive: boolean;
	accountSerialId: number;
}
