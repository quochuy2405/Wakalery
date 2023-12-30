import { getSessionWithExpiry } from "@/utils/session";
import axios from "axios";
import { refreshAccessToken } from "./refresh_token";
export const APP_API_HOST = "http://14.225.203.193:8080";
// export const APP_API_HOST = " http://192.168.10.95:8080";
const axiosAuth = axios.create({
	baseURL: APP_API_HOST,
});

const axiosClient = axios.create({
	baseURL: APP_API_HOST,
});

export const auth = () => {
	// Request interceptor for API calls
	axiosAuth.interceptors.request.use(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async (config: any) => {
			const access_token = await getSessionWithExpiry("session-auth");
			config.headers = {
				Authorization: `Bearer ${access_token}`,
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			};
			return config;
		},
		(error) => {
			Promise.reject(error);
		}
	);
	// Response interceptor for API calls
	axiosAuth.interceptors.response.use(
		(response) => {
			return response;
		},
		async function (error) {
			const originalRequest = error.config;
			if (error.response.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;
				const access_token = await refreshAccessToken();

				axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
				return axiosAuth(originalRequest);
			}
			return Promise.reject(error);
		}
	);
	return axiosAuth;
};

export const unauth = () => {
	return axiosClient;
};
