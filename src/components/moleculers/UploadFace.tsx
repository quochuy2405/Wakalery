import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile } from "antd";
import React from "react";
interface UploadFaceProps {
	value?: UploadFile[];
	id?: string;
	onChange?: (files: UploadFile[]) => void;
}
const UploadFace: React.FC<UploadFaceProps> = (props) => {

	return (
		<Upload
			id={props.id}
			beforeUpload={() => false}
			listType='picture'
			defaultFileList={props?.value}
			onChange={({ fileList }) => {
				props?.onChange?.(fileList);
			}}
			maxCount={1}>
			{!props?.value?.length && <Button icon={<UploadOutlined />}>Upload</Button>}
		</Upload>
	);
};
export default UploadFace;
