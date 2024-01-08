import { createNewProject } from "@/apis/project";
import { Button, Form, Input, Modal, message } from "antd";
interface ModalCreateProjectProps {
	open: boolean;
	onClose: () => void;
}
const ModalCreateProject: React.FC<ModalCreateProjectProps> = ({ onClose, open }) => {
	const onSubmit = (data: { name: string }) => {
		if (!data.name) {
			message.error("Project name can't null.");
			return;
		}
		createNewProject({
			projectName: data.name,
			userId: "1",
		})
			.then(() => {
				onClose();
				message.success("Successfully!");
			})
			.catch(() => {
				message.error("Error!");
			});
	};
	return (
		<Modal title='Create project' open={open} onCancel={onClose} footer={null}>
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

export default ModalCreateProject;
