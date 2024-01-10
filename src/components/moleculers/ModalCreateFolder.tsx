import { createFolderByParentyId } from "@/apis/folder";
import { Button, Form, Input, Modal, message } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

interface ModalCreateFolderProps {
	open: boolean;
	onClose: () => void;
	refresh: () => void;
}
const ModalCreateFolder: React.FC<ModalCreateFolderProps> = ({ onClose, refresh, open }) => {
	const { projectId, userDirectoryId } = useParams();
	const onSubmit = (data: { name: string }) => {
		if (!data.name) {
			message.error("Folder name can't null.");
			return;
		}
		if (!projectId) return;
		createFolderByParentyId({
			folderName: data.name,
			userId: 1,
			projectId: Number (projectId),
			folderId: Number(userDirectoryId) || 0,
		})
			.then(() => {
				onClose();
				message.success("Successfully!");
				refresh();
			})
			.catch(() => {
				message.error("Error!");
			});
	};
	return (
		<Modal title='Create Folder' open={open} onCancel={onClose} footer={null}>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 100 }}
				className='w-full'
				onFinish={onSubmit}
				layout='horizontal'>
				<Form.Item name='name'>
					<Input />
				</Form.Item>

				<Button
					htmlType='submit'
					className='w-fit ml-auto bg-emerald-500 !text-white flex items-center justify-center button-form mt-6'>
					Submit
				</Button>
			</Form>
		</Modal>
	);
};

export default ModalCreateFolder;
