import { deleteFolderOrImage } from "@/apis/folder";
import { IMAGE_PREFIX } from "@/constants/index";
import { addFileMove } from "@/redux/features/filemove";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { openMove } from "@/redux/features/onmove";
import { RootState } from "@/redux/store";
import { ImageType } from "@/types/image";
import { onDownload } from "@/utils/common";
import { getUserInfoCookie } from "@/utils/cookies";
import { DownloadOutlined, LockOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Dropdown, MenuProps, Popconfirm, Tooltip, message } from "antd";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { GiMove } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
interface ImageItemProps {
	image: ImageType;
	isPublicManage?: boolean;
	onQuickPreview: (image: ImageType) => void;
	onCompletedMove?: (image: object) => void;
	refresh?: () => void;
}
const ImageItem: React.FC<ImageItemProps> = ({
	onQuickPreview,
	onCompletedMove,
	refresh,
	image,
	isPublicManage,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const user = getUserInfoCookie();
	const src = IMAGE_PREFIX + `${user?.user_id}/` + image.photoName;
	const [isDelete, setIsDeleted] = useState(false);

	const items: MenuProps["items"] = [
		{
			label: "Move",
			key: "1",
			icon: <GiMove />,
			onClick: () => {
				dispatch(openMove());
				dispatch(addFileMove(image));
			},
		},
		{
			label: "Download",
			key: "2",
			icon: <DownloadOutlined />,
			onClick: () => {
				onDownload(src);
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
	const itemsPublicManage = [
		{
			label: "Change Visibility",
			key: "1",
			icon: <LockOutlined />,
			onClick: () => {},
		},
		{
			label: "Download",
			key: "2",
			icon: <DownloadOutlined />,
			onClick: () => {
				onDownload(src);
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
	const menuProps = {
		items: isPublicManage ? itemsPublicManage : items,
	};
	const onDeleteImage = async () => {
		dispatch(startLoading());
		setIsDeleted(false);
		await deleteFolderOrImage({ fileId: Number(image.photoSerialId), type: "PHOTO" })
			.then(() => {
				message.success("Deleted.");
				onCompletedMove?.(image);
				refresh?.();
			})
			.catch(() => {
				message.error("Something error!!!");
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	};

	return (
		<div className='min-w-[180px] shadow-xl max-w-[340px] h-[220px] bg-gray-200 rounded-2xl overflow-hidden relative w-[-webkit-fill-available] md:w-[unset] m-auto md:m-[unset]'>
			<LazyLoadImage src={src} className='w-full h-full object-cover object-top absolute z-1' />
			<p className='p-2 font-semibold bg-white text-[10px] text-black max-w-[60%] truncate leading-2 rounded-br-xl z-9 relative shadow-sm'>
				{image.photoName}
			</p>
			<div className='absolute top-3 right-3 flex gap-1'>
				{/* <div className='box-border w-6 h-6 flex items-center justify-center cursor-pointer rounded-full bg-neutral-100 ease-linear duration-200 '>
					<Rate count={1} className='text-[14px]' character={<HeartFilled size={0} />} />
				</div> */}
				<div
					onClick={() => onQuickPreview(image)}
					className='p-1 w-6 h-6 flex items-center justify-center hover:bg-neutral-100 cursor-pointer ease-linear duration-200 rounded-full text-white hover:text-gray-800'>
					<Tooltip title='Quick preview'>
						<BsEyeFill size={40} />
					</Tooltip>
				</div>
				<Popconfirm
					title='Delete Image'
					description='Are you sure to delete this image?'
					onConfirm={onDeleteImage}
					onCancel={() => setIsDeleted(false)}
					okText='OK'
					placement='top'
					open={isDelete}
					cancelText='Cancel'>
					<Dropdown menu={menuProps}>
						<div className='p-2  w-6 h-6 flex items-center justify-center hover:bg-neutral-100 cursor-pointer ease-linear duration-200 rounded-full fill-white hover:fill-gray-800'>
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

			<Link
				to={`/works/project/preview?name=${image.photoName}`}
				className='p-3 font-bold text-sm text-white absolute bottom-0 hover:bg-white z-2 right-0 cursor-pointer rounded-tl-2xl ease-linear duration-200 hover:text-black w-[40%] h-[20%] flex items-center justify-center'>
				Preview
			</Link>
		</div>
	);
};

export default ImageItem;
