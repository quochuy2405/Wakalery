import { Button } from "antd";
import clsx from "clsx";
import React from "react";
import { BiSolidVideos } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { FcFolder } from "react-icons/fc";
import { HiDocumentText } from "react-icons/hi2";
import { MdMoveDown } from "react-icons/md";
interface DirectoryRowProps {
	name: string;
	isFolder: boolean;
	disabled: boolean;
	onClick: () => void;
	onMove: (name: string) => void;
	refresh: () => void;
}
const IconByType: Record<string, React.ReactNode> = {
	img: <BsImage size={20} color='#00DFA2' />,
	doc: <HiDocumentText size={20} color='#0079FF' />,
	video: <BiSolidVideos size={22} color='#E1AA74' />,
};

const typeDefine: Record<string, string> = {
	png: "img",
	jpg: "img",
	jpeg: "img",
	mp4: "video",
	txt: "doc",
};
const DirectoryRowMove: React.FC<DirectoryRowProps> = ({ name, isFolder, onClick, onMove }) => {
	const lastFile = name.slice(-3).toLocaleLowerCase() as keyof typeof typeDefine;

	return (
		<div
			className={clsx(
				"flex transition-opacity h-[40px] min-h-[40px] w-full bg-neutral-50/30 hover:bg-neutral-100 items-center px-4 rounded-md cursor-pointer gap-2"
			)}
			onClick={onClick}>
			{isFolder && <FcFolder size={20} />}
			{!isFolder && IconByType[typeDefine[lastFile]]}
			<p className='flex-1 text-sm font-medium uppercase hover:text-emerald-600'>{name}</p>

			<Button
				icon={<MdMoveDown size={16} />}
				onClick={(e) => {
					e.stopPropagation();
					onMove(name);
				}}
				className='font-normal items-center flex justify-center text-xs'>
				Move In
			</Button>
		</div>
	);
};

export default DirectoryRowMove;
