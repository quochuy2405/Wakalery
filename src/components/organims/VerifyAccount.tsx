import { useSocket } from "@/hooks/socket";
import { RootState } from "@/redux/store";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

const VerifyAccount = () => {
	const verify = useSelector((state: RootState) => state.verify.status);
	useSocket({ url: "wss://javascript.info/article/websocket/demo/hello" });
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
