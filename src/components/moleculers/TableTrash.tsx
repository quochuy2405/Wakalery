/* eslint-disable @typescript-eslint/no-explicit-any */

import { recoveryMaterial } from "@/apis/trash";
import { ImageType, PhotoDirectory } from "@/types/image";
import { ProjectType } from "@/types/project";
import { Button, Popconfirm, Table, message } from "antd";
import moment from "moment";
import React from "react";
import { BsDatabaseDown, BsFolder, BsImage } from "react-icons/bs";
import { MdDelete, MdRestore } from "react-icons/md";

const IconByType = {
	IMAGE: <BsImage size={18} />,
	FOLDER: <BsFolder size={18} />,
	PROJECT: <BsDatabaseDown size={18} />,
};

const IconColor = {
	IMAGE: "text-[#00DFA2]",
	PROJECT: "text-[#0079FF]",
	FOLDER: "text-yellow-600",
};
interface TableTrashProps {
	data: any;
	refresh?: () => void;
}
const TableTrash: React.FC<TableTrashProps> = ({ data, refresh }) => {
	const onDeleteImage = (record: ProjectType & ImageType & PhotoDirectory) => {
		const material = {
			type: (!!record.projectId && "PROJECT") || (!!record.userDirectoryId && "FOLDER") || "IMAGE",
			fileId:
				Number(record.projectId) || Number(record.userDirectoryId) || Number(record.photoSerialId),
		};
		recoveryMaterial(material)
			.then(() => {
				message.success("Recoveried");
				refresh?.();
			})
			.catch(() => {
				message.error("You can't recovery this " + material.type);
			});
	};
	const columns: Array<any> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			className: "text-xs",
			render: (_: unknown, record: ProjectType & ImageType & PhotoDirectory) => {
				const type =
					(!!record.projectId && "PROJECT") || (!!record.userDirectoryId && "FOLDER") || "IMAGE";
				const name = record.projectName || record.folderName || record.photoName;
				return (
					<div className='flex items-center gap-2 cursor-pointer'>
						<span className={`${IconColor[type]}`}>{IconByType[type]}</span>
						<p className='font-normal text-xs'>{name}</p>
					</div>
				);
			},
		},
		{
			title: "Last Modified",
			dataIndex: "modified",
			key: "modified",
			className: "text-xs",
			render: (text: string) => (
				<p className='font-normal text-xs'>{moment(text).format("MMMM, DD YYYY")}</p>
			),
		},
		{
			title: "Restore",
			dataIndex: "",
			key: "",
			width: "140px",
			className: "text-xs",
			render: (_: unknown, record: ProjectType & ImageType & PhotoDirectory) => {
				return (
					<Popconfirm
						title='Delete Image'
						description='Are you sure to delete this image?'
						onConfirm={() => onDeleteImage(record)}
						okText='OK'
						placement='top'
						cancelText='Cancel'>
						<Button
							icon={<MdRestore size={16} />}
							className='font-normal items-center flex justify-center text-xs'>
							Restore{" "}
						</Button>
					</Popconfirm>
				);
			},
		},
		{
			title: "Delete",
			dataIndex: "",
			key: "",
			className: "text-xs",
			render: () => (
				<Button
					icon={<MdDelete size={16} />}
					className='font-normal items-center flex justify-center text-xs border-red-500 text-red-500'>
					Forever
				</Button>
			),
		},
	];

	return <Table dataSource={data} scroll={{ y: 560 }} columns={columns} />;
};

export default TableTrash;
