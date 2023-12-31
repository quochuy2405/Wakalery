import { RootState } from "@/redux/store";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
	const loading = useSelector((state: RootState) => state.loading);
	if (!loading) return <></>;
	return (
		<div className="w-screen fixed z-[9999] left-0 top-0 items-center justify-center h-screen flex flex-col bg-gray-600/20">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 44, color:'white' }} spin />} />;
		</div>
	);
};

export default Loading;
