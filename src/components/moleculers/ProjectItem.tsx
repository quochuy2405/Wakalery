import { updateProject } from "@/apis/project";
import FolderBg from "@/assets/folder.svg";
import { ProjectType } from "@/types/project";
import { Dropdown, Form, Input, MenuProps, Modal, Popconfirm, Rate, message } from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import React, { memo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { Link } from "react-router-dom";
interface ProjectItemProps {
	data: ProjectType;
	refresh: () => void;
	deleted?: boolean;
}
const ProjectItem: React.FC<ProjectItemProps> = ({ data, deleted = true, refresh }) => {
	const [form] = useForm();

	const [isDelete, setIsDeleted] = useState(false);
	const [isRename, setIsRename] = useState(false);
	const items: MenuProps["items"] = [
		{
			label: "Rename",
			key: "1",
			icon: <BiRename />,
			onClick: () => {
				form.setFieldValue("projectName", data.projectName);
				setIsRename(true);
			},
		},
		{
			label: "Delete",
			key: "3",
			icon: <AiFillDelete />,
			danger: true,
			onClick: () => {
				setIsDeleted(true);
			},
		},
	];
	const onDeleted = () => {
		updateProject({ ...data, deleted: true })
			.then(() => {
				message.success("Successfully!");
				refresh();
			})
			.catch(() => {
				message.error("Error!");
			});
		setIsDeleted(false);
	};

	const onFavorite = (value: boolean) => {
		updateProject({ ...data, favorite: value })
			.then(() => {
				message.success(`${value ? "Adding in" : "Remove out"} favorites!`);
				refresh();
			})
			.catch(() => {
				message.error("Error!");
			});
		setIsDeleted(false);
	};

	const onRename = async ({ projectName }: { projectName: string }) => {
		await updateProject({ ...data, projectName })
			.then(() => {
				message.success(`Rename successfuly.`);
				refresh();
			})
			.catch(() => {
				message.error("Error!");
			})
			.finally(() => {
				setIsRename(false);
			});
	};
	const menuProps = {
		items,
	};

	return (
		<div className='min-w-[180px] shadow-xl max-w-[340px] h-[220px] bg-gray-200 rounded-2xl overflow-hidden relative w-[-webkit-fill-available] md:w-[unset] m-auto md:m-[unset]'>
			<img aria-label='bg' src={FolderBg} className='w-full h-full object-cover absolute z-1' />
			<p className='p-2 font-bold text-sm text-gray-600 leading-8'>{data?.projectName}</p>
			<div className='absolute top-3 right-3 flex gap-2'>
				<div className='p-3 ease-linear duration-200 w-9 h-9 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
					<Rate
						count={1}
						defaultValue={data?.favorite ? 1 : 0}
						onChange={(value) => {
							onFavorite(!!value);
						}}
					/>
				</div>
				{deleted && (
					<Popconfirm
						title='Delete Project'
						description='Are you sure to delete this project?'
						onConfirm={onDeleted}
						onCancel={() => setIsDeleted(false)}
						okText='OK'
						placement='top'
						open={isDelete}
						cancelText='Cancel'>
						<Dropdown menu={menuProps}>
							<div className='p-3 w-9 ease-linear duration-200 h-9 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
								<svg
									className='gUZ R19 U9O kVc'
									height='20'
									width='20'
									viewBox='0 0 24 24'
									aria-hidden='true'
									aria-label=''
									role='img'>
									<path d='M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z'></path>
								</svg>
							</div>
						</Dropdown>
					</Popconfirm>
				)}
			</div>
			<div className='w-full h-full relative p-4 z-10 flex flex-col gap-2'>
				<div className=' flex gap-2 justify-between'>
					<p className='font-semibold text-xs'>Storage</p>
					<p className='font-medium text-xs'>In process</p>
				</div>
				<div className=' flex gap-2 justify-between'>
					<p className='font-semibold text-xs'>Files</p>
					<p className='font-medium text-xs'>In process</p>
				</div>
				<div className=' flex gap-2 justify-between'>
					<p className='font-semibold text-xs'>Date created</p>
					<p className='font-medium text-xs'>{moment(data?.createAt).format("DD-MM-YYYY")}</p>
				</div>
			</div>
			<Link
				to={`/works/project/${data.projectId}`}
				className='p-3 font-bold text-sm text-gray-600 absolute bottom-0 hover:bg-white z-10 right-0 cursor-pointer z-2 hover:text-black w-[40%] h-[20%] flex items-center justify-center ease-linear duration-200'>
				Open
			</Link>
			<Modal open={isRename} onCancel={() => setIsRename(false)} onOk={form.submit}>
				<Form onFinish={onRename} form={form} className='p-4 flex flex-col gap-1'>
					<p className='font-semibold'>Project name:</p>
					<Form.Item
						name='projectName'
						rules={[{ required: true, message: "Enter project name " }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default memo(ProjectItem);
