import { uploadFiles } from "@/apis/upload";
import { getUserInfo } from "@/apis/user";
import { startTrain } from "@/redux/features/detect";
import { setProgress } from "@/redux/features/fileprogress";
import { setStorage } from "@/redux/features/storage";
import { RootState } from "@/redux/store";
import { InboxOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Modal, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;
interface UploadFileModalProps {
	open: boolean;
	onClose: () => void;
	refresh: () => void;
}
const UploadFileModal: React.FC<UploadFileModalProps> = ({ open, refresh, onClose }) => {
	const [files, setFiles] = useState<UploadFile[]>([]);
	const { userDirectoryId } = useParams();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	const handleUpload = async () => {
		if (!files.length) {
			message.open({
				type: "warning",
				content: "Let's choose least one of picture.",
				duration: 6,
			});
			return;
		}

		dispatch(setProgress(1));
		await uploadFiles(files, "1", userDirectoryId || "0", progressUpload).then(async () => {
			dispatch(startTrain());
			await getUserInfo("1").then(({ data }) => {
				dispatch(setStorage(data));
			});

			message.open({
				type: "success",
				content: "Upload successfuly.",
				duration: 20,
			});
			refresh();
			setFiles([]);
			onClose();
		});
	};
	const progressUpload = (percent: number) => {
		dispatch(setProgress(percent));
	};

	const props: UploadProps = {
		name: "file",
		multiple: true,
		fileList: files,
		listType: "text",

		onChange(info) {
			info.file.status = "done";
			setFiles(info.fileList);
		},
		onDrop(e) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const data: any = e.dataTransfer.files as FileList;
			setFiles(data);
		},
	};

	return (
		<Modal
			open={open}
			onCancel={() => {
				onClose();
				setFiles([]);
			}}
			okText='Upload'
			onOk={handleUpload}>
			<div className='p-4'>
				<Dragger {...props}>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>Click or drag file to this area to upload</p>
					<p className='ant-upload-hint'>
						Support for a single or bulk upload. Strictly prohibited from uploading company data or
						other banned files.
					</p>
				</Dragger>
			</div>
		</Modal>
	);
};

export default UploadFileModal;
