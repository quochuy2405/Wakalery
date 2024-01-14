import { deleteFolderOrImage } from "@/apis/folder";
import FolderBg from "@/assets/folder.svg";
import { addFileMove } from "@/redux/features/filemove";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { openMove } from "@/redux/features/onmove";
import { RootState } from "@/redux/store";
import { PhotoDirectory } from "@/types/image";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Dropdown, MenuProps, Popconfirm, message } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GiMove } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

interface FolderItemProps {
	data: PhotoDirectory;
	onCompletedMove?: (image: object) => void;
}
const FolderItem: React.FC<FolderItemProps> = ({ data, onCompletedMove }) => {
	const path = useParams();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const [isDelete, setIsDeleted] = useState(false);
	const items: MenuProps["items"] = [
		{
			label: "Move",
			key: "1",
			icon: <GiMove />,
			onClick: () => {
				dispatch(openMove());
				dispatch(addFileMove(data));
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
	const onDeleteImage = async () => {
		dispatch(startLoading());
		setIsDeleted(false);
		await deleteFolderOrImage({ fileId: Number(data.userDirectoryId), type: "FOLDER" })
			.then(async () => {
				message.success("Deleted.");

				onCompletedMove?.(data);
			})
			.catch(() => {
				message.error("Something error!!!");
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	};

	const menuProps = {
		items,
	};
	return (
		<div className='min-w-[180px] shadow-xl max-w-[340px] h-[220px] bg-gray-200 rounded-2xl overflow-hidden relative w-[-webkit-fill-available] md:w-[unset] m-auto md:m-[unset]'>
			<img aria-label='bg' src={FolderBg} className='w-full h-full object-cover absolute z-1' />
			<p className='p-2 font-bold text-sm text-gray-600 leading-8 h-16'>{data.folderName}</p>
			<div className='absolute top-3 right-3 flex gap-2'>
				<Popconfirm
					title='Delete Image'
					description='Are you sure to delete this image?'
					onConfirm={onDeleteImage}
					onCancel={() => setIsDeleted(false)}
					okText='OK'
					placement='top'
					open={!!isDelete}
					cancelText='Cancel'>
					<Dropdown menu={menuProps}>
						<div className='p-3 w-9 h-9 ease-linear duration-200 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
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
				to={`/works/project/1${(path["*"] ? "/" + path["*"] : "") + "/"}${data.userDirectoryId}`}
				className='p-3 font-bold text-sm text-gray-600 absolute bottom-0 hover:bg-white z-10 right-0 cursor-pointer z-2 ease-linear duration-200 hover:text-black w-[40%] h-[20%] flex items-center justify-center'>
				Open
			</Link>
		</div>
	);
};

export default FolderItem;
