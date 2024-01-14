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
	const onRestore = (record: ProjectType & ImageType & PhotoDirectory) => {
		const material = {
			type: (!!record.projectName && "PROJECT") || (!!record.folderName && "FOLDER") || "IMAGE",
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

	const onDeleteForever = (record: ProjectType & ImageType & PhotoDirectory) => {
		const material = {
			type: (!!record.projectName && "PROJECT") || (!!record.folderName && "FOLDER") || "IMAGE",
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
			width: "240px",
			className: "text-xs",
			render: (_: unknown, record: ProjectType & ImageType & PhotoDirectory) => {
				const type =
					(!!record.projectName && "PROJECT") || (!!record.folderName && "FOLDER") || "IMAGE";
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
			width: "140px",
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
						title='Restore'
						description='Are you sure to restore this ?'
						onConfirm={() => onRestore(record)}
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
			width: "140px",
			className: "text-xs",
			render: (_: unknown, record: ProjectType & ImageType & PhotoDirectory) => (
				<Popconfirm
					title='Delete forever'
					description='Are you sure to delete forever this ?'
					onConfirm={() => onDeleteForever(record)}
					okText='OK'
					placement='top'
					cancelText='Cancel'>
					<Button
						icon={<MdDelete size={16} />}
						className='font-normal items-center flex justify-center text-xs border-red-500 text-red-500'>
						Forever
					</Button>
				</Popconfirm>
			),
		},
	];

	return <Table dataSource={data} scroll={{ y: 660 }} columns={columns} />;
};

export default TableTrash;
