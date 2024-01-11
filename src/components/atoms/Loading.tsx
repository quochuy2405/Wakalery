/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

const Loading = () => {
	const [open, setOpen] = useState(true);
	const loading = useSelector((state: RootState) => state.loading);

	let time: any = null;
	useEffect(() => {
		time && clearTimeout(time);

		// eslint-disable-next-line react-hooks/exhaustive-deps
		time = setTimeout(() => {
			setOpen(loading);
		}, 300);
	}, [loading]);
	return (
		<div
			className={clsx(
				"w-screen fixed z-[9999] left-0 top-0 items-center justify-center h-screen flex flex-col bg-gray-600/20 transition-all ease-linear duration-300 opacity-1",
				{
					"!opacity-0": !loading,
					hidden: !open,
				}
			)}>
			<Spin indicator={<LoadingOutlined style={{ fontSize: 44, color: "white" }} spin />} />
		</div>
	);
};

export default Loading;
