import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";

const UploadFace: React.FC = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	return (
		<Upload
			action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
			listType='picture'
			defaultFileList={[...fileList]}
			onChange={({ fileList }) => {
				setFileList(fileList);
			}}
			maxCount={1}>
			{!fileList.length && <Button icon={<UploadOutlined />}>Upload</Button> }
		</Upload>
	);
};
export default UploadFace;
