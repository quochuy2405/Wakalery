import { uploadFiles } from "@/apis/upload";
import { getUserInfo } from "@/apis/user";
import { startTrain } from "@/redux/features/detect";
import { setProgress } from "@/redux/features/fileprogress";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { setStorage } from "@/redux/features/storage";
import { RootState } from "@/redux/store";
import { InboxOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Modal, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;
interface UploadFileModalProps {
	open: boolean;
	onClose: () => void;
	refresh: () => void;
}
const UploadFileModal: React.FC<UploadFileModalProps> = ({ open, refresh, onClose }) => {
	const [files, setFiles] = useState<UploadFile[]>([]);
	const { projectId, userDirectoryId } = useParams();
	const allow = useSelector((state: RootState) => state.detect.allow);
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
		if (!projectId) return;
		dispatch(startLoading());
		dispatch(setProgress(1));
		await uploadFiles(files, Number(projectId), Number(userDirectoryId) || -1, progressUpload)
			.then(async () => {
				allow && dispatch(startTrain());
				await getUserInfo().then(({ data }) => {
					dispatch(setStorage(data));
				});

				message.open({
					type: "success",
					content: "Upload successfuly.",
					duration: 20,
				});
			})
			.finally(() => {
				refresh();
				setFiles([]);
				onClose();
				dispatch(closeLoading());
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
				<Dragger accept='image/png,image/jpg,image/jpeg' {...props}>
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
