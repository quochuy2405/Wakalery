import { PhotoDirectory } from "@/types/image";
import { Button, Popconfirm } from "antd";
import clsx from "clsx";
import React from "react";
import { BiSolidVideos } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";
import { HiDocumentText } from "react-icons/hi2";
import { MdMoveDown } from "react-icons/md";
interface DirectoryRowProps {
	data?: PhotoDirectory;
	isFolder: boolean;
	disabled: boolean;
	onClick: () => void;
	onMove: () => void;
}
const IconByType: Record<string, React.ReactNode> = {
	img: <BsImage size={20} color='#00DFA2' />,
	doc: <HiDocumentText size={20} color='#0079FF' />,
	video: <BiSolidVideos size={22} color='#E1AA74' />,
};

const DirectoryRowMove: React.FC<DirectoryRowProps> = ({ data, isFolder, onClick, onMove }) => {
	return (
		<div
			className={clsx(
				"flex transition-opacity h-[40px] min-h-[40px] w-full bg-neutral-50/30 hover:bg-neutral-100 items-center px-4 rounded-md cursor-pointer gap-2"
			)}
			onClick={onClick}>
			{isFolder && <FcFolder size={20} />}
			{!isFolder && IconByType["img"]}
			<p className='flex-1 text-sm font-medium uppercase hover:text-emerald-600 truncate'>
				{isFolder ? data?.folderName : data?.photoName}
			</p>
			{isFolder && (
				<Popconfirm
					title='Move In'
					description='Are you sure to move in this folder?'
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onConfirm={(event: any) => {
						event.stopPropagation();
						onMove();
					}}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onCancel={(event: any) => {
						event.stopPropagation();
					}}
					okText='Yes'
					cancelText='No'>
					<Button
						icon={<MdMoveDown size={16} />}
						onClick={(e) => {
							e.stopPropagation();
						}}
						className='font-normal items-center flex justify-center text-xs'>
						Move In
					</Button>
				</Popconfirm>
			)}
		</div>
	);
};

export default DirectoryRowMove;
