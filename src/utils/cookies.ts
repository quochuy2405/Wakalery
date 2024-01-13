import { jwtDecode } from "jwt-decode";

export const cookieAuthHandles = {
	set: (token: string, expirationDays = 1) => {
		const date = new Date();
		date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
		const expires = `expires=${date.toUTCString()}`;
		document.cookie = `token=${token}; ${expires}; path=/`;
	},
	get: () => {
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
		return token;
	},
	clear: () => {
		// Set the expiration date to a past date to remove the cookie
		const expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
		document.cookie = `token=; ${expires}; path=/`;
	},
};

type JWTDecode = {
	sub: string;
	user_id: number;
	first_name: string;
	last_name: string;
	avatar: string;
	role: string;
	iat: number;
	exp: number;
};
export const getUserInfoCookie = () => {
	try {
		const token = cookieAuthHandles.get();
		if (!token) return null;
		const decodedHeader = jwtDecode<JWTDecode>(token);
		return decodedHeader;
	} catch (error) {
		return null;
	}
};
