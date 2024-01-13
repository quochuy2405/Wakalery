import { RootState } from "@/redux/store";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Client } from "@stomp/stompjs";

const VerifyAccount = () => {
	useEffect(() => {
		const client = new Client({
			brokerURL: "wss://isphoto.ftisu.vn/ws",
			onConnect: () => {
				client.subscribe("/api/auth/respone_verification", (message) =>
					console.log(`Received: ${message.body}`)
				);
			},
		});
		client.activate();
	}, []);
	const verify = useSelector((state: RootState) => state.verify.status);

	if (verify === "close") return <></>;

	return (
		<div
			className={clsx(
				"w-screen fixed z-[9999] left-0 top-0 items-center justify-center h-screen flex flex-col bg-gray-600/20 transition-all ease-linear duration-300 opacity-1",
				{
					"!opacity-0": !verify,
					hidden: !verify,
				}
			)}>
			<h2>{verify}</h2>
		</div>
	);
};

export default VerifyAccount;
