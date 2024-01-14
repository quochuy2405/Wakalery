/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCheckSteg } from "@/apis/image";
import { uploadFiles } from "@/apis/upload";
import { getUserInfo } from "@/apis/user";
import { startTrain } from "@/redux/features/detect";
import { setProgress } from "@/redux/features/fileprogress";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { setStorage } from "@/redux/features/storage";
import { RootState } from "@/redux/store";
import { InboxOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Modal, Tooltip, Upload, UploadFile, UploadProps, message } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;
interface UploadFileModalProps {
	open: boolean;
	onClose: () => void;
	refresh: () => void;
}

interface DraggableUploadListItemProps {
	originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	file: UploadFile<any>;
}
const DraggableUploadListItem = ({ originNode, file }: DraggableUploadListItemProps) => {
	const style: React.CSSProperties = {
		cursor: "move",
		color: (file?.status as any) === "warning" ? "#faad14" : "#0ccc7b",
	};
	if ((file?.status as any) === "warning") {
		return (
			<Tooltip title='Image belong to another user'>
				<div
					style={style}
					// prevent preview event when drag end
				>
					{originNode}
				</div>
			</Tooltip>
		);
	}

	return (
		<div
			style={style}
			// prevent preview event when drag end
		>
			{originNode}
		</div>
	);
};

const UploadFileModal: React.FC<UploadFileModalProps> = ({ open, refresh, onClose }) => {
	const [files, setFiles] = useState<UploadFile[]>([]);
	const { projectId, userDirectoryId } = useParams();
	const allow = useSelector((state: RootState) => state.detect.allow);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const refStegData = useRef<Array<{ ownerId: number; photoName: string }>>([]);

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
		await uploadFiles(
			files,
			Number(projectId),
			Number(userDirectoryId) || -1,
			refStegData.current,
			progressUpload
		)
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
        refStegData.current=[]
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
			dispatch(startLoading());
			info.file.status = "uploading";

			getCheckSteg(info.fileList)
				.then(({ data }) => {
					refStegData.current = data;
					const names = data?.map((item: any) => item.photoName);
					console.log("names", names);
					const currentFile: any = info.fileList.map((file) => {
						console.log("names.includes(file.fileName)", file.name);
						if (names.includes(file.name))
							return {
								...file,
								status: "warning",
							};
						return file;
					});
					info.file.status = "done";
					setFiles(currentFile);
				})
				.finally(() => {
					dispatch(closeLoading());
				});
		},
		onRemove(file) {
			const name = file.fileName;
			const dataSteg = refStegData.current.filter((item) => item.photoName !== name);
			refStegData.current = dataSteg;
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
				<Dragger
					accept='image/png,image/jpg,image/jpeg'
					{...props}
					itemRender={(originNode, file) => (
						<DraggableUploadListItem originNode={originNode} file={file} />
					)}>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>Click or drag file to this area to upload</p>
					<p className='ant-upload-hint'>
						Support for a single or bulk upload. Strictly prohibited from uploading company data or
						other banned files.
					</p>
					{!!refStegData.current.length&&<p className="text-red-500 mt-4">I will send to email owner image if you upload image belong to another owner</p>}
				</Dragger>
			</div>
		</Modal>
	);
};

export default UploadFileModal;
