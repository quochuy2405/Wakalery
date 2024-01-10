import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal } from "antd";
import React from "react";

interface CreateModalProps {
	open: boolean;
	onClose: () => void;
}
type FieldType = {
	name?: string;
};
const CreateModal: React.FC<CreateModalProps> = ({ open, onClose }) => {
	const onFinish = async () => {};

	return (
		<Modal
			open={open}
			onCancel={() => {
				onClose();
			}}
			okText='Upload'
			footer={null}>
			<div className='p-4'>
				<p className='ant-upload-drag-icon'>
					<InboxOutlined />
				</p>
				<p className='ant-upload-text'>Click or drag file to this area to upload</p>
				<p className='ant-upload-hint'>
					Support for a single or bulk upload. Strictly prohibited from uploading company data or
					other banned files.
				</p>
				<Form
					name='basic'
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete='off'>
					<Form.Item<FieldType>
						label='Username'
						name='name'
						rules={[{ required: true, message: "Please input your username!" }]}>
						<Input />
					</Form.Item>
				</Form>
			</div>
		</Modal>
	);
};

export default CreateModal;
