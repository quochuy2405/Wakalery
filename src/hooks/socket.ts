/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
type UseSocketProps = {
	url: string;
};
export const useSocket = ({ url }: UseSocketProps) => {
	const socketRef = useRef<any>(null);

	const connect = () => {
		if (!url) return;

		const socket = new WebSocket(url);

		socket.onopen = function () {
			console.log("WebSocket connected");
		};

		socket.onmessage = function (event) {
			console.log(`[message] Data received from server: ${event.data}`);
		};

		socket.onclose = function (event) {
			if (event.wasClean) {
				console.warn(
					`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
				);
			} else {
				console.error("[close] Connection died");
			}

			// Auto-reconnect on close
			setTimeout(connect, 4000);
		};

		socket.onerror = function (error) {
			console.error("error", error);
		};

		socketRef.current = socket;
	};

	useEffect(() => {
		// Auto-connect on mount
		connect();

		return () => {
			if (socketRef.current) {
				socketRef.current.close();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	const send = (message: object) => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(message));
		} else {
			console.error("WebSocket not connected. Message not sent.");
		}
	};

	return { send };
};
