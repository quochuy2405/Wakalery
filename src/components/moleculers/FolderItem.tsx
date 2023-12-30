import FolderBg from "@/assets/folder.svg";
import { Dropdown, MenuProps, Rate } from "antd";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GiMove } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { openMove } from "@/redux/features/onmove";

const FolderItem = () => {
	const dispatch = useDispatch();
	const items: MenuProps["items"] = [
		{
			label: "Move",
			key: "1",
			icon: <GiMove />,
			onClick: () => dispatch(openMove()),
		},
		{
			label: "Delete",
			key: "3",
			icon: <AiFillDelete />,
			danger: true,
		},
	];
	const menuProps = {
		items,
	};

	return (
		<div className='min-w-[180px] shadow-xl max-w-[400px] h-[24vh] bg-gray-200 rounded-2xl overflow-hidden relative'>
			<img src={FolderBg} className='w-full h-full object-cover absolute z-1' />
			<p className='p-2 font-bold text-sm text-gray-600 leading-8'>Folder Name</p>
			<div className='absolute top-3 right-3 flex gap-2'>
				<div className='p-3 w-9 h-9 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
					<Rate count={1} />
				</div>
				<Dropdown menu={menuProps}>
					<div className='p-3 w-9 h-9 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
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
			</div>
			<div className='w-full h-full relative p-4 z-10 flex flex-col gap-2'>
				<div className=' flex gap-2 justify-between'>
					<p className='font-semibold text-xs'>Storage</p>
					<p className='font-medium text-xs'>2.00GB Usage</p>
				</div>
				<div className=' flex gap-2 justify-between'>
					<p className='font-semibold text-xs'>Files</p>
					<p className='font-medium text-xs'>1213 files</p>
				</div>
				<div className=' flex gap-2 justify-between'>
					<p className='font-semibold text-xs'>Date created</p>
					<p className='font-medium text-xs'>20/05/2023</p>
				</div>
			</div>
			<Link
				to='/works/project/0001'
				className='p-3 font-bold text-sm text-gray-600 absolute bottom-0 hover:bg-white z-10 right-0 cursor-pointer z-2 hover:text-black w-[40%] h-[20%] flex items-center justify-center'>
				Open
			</Link>
		</div>
	);
};

export default FolderItem;
