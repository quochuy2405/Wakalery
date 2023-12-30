import { openMove } from "@/redux/features/onmove";
import { PhotoDirectory } from "@/types/image";
import { Dropdown, MenuProps, Rate, Tooltip } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { GiMove } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
interface ImageItemProps {
	onQuickPreview: (image: PhotoDirectory) => void;
	image: PhotoDirectory;
}
const ImageItem: React.FC<ImageItemProps> = ({ onQuickPreview, image }) => {
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
			<img
				src={"/login-image.png"}
				className='w-full h-full object-cover object-top absolute z-1'
			/>
			<p className='p-2 font-bold text-sm text-white leading-8 z-9 relative'>Image Name</p>
			<div className='absolute top-3 right-3 flex gap-2'>
				<div className='p-3 box-border w-9 h-9 flex items-center justify-center bg-neutral-100 cursor-pointer rounded-full'>
					<Rate count={1} />
				</div>
				<div
					onClick={() => onQuickPreview(image)}
					className='p-3 w-9 h-9 flex items-center justify-center hover:bg-neutral-100 cursor-pointer ease-linear duration-100 rounded-full text-white hover:text-gray-800'>
					<Tooltip title='Quick preview'>
						<BsEyeFill size={40} />
					</Tooltip>
				</div>

				<Dropdown menu={menuProps}>
					<div className='p-3 w-9 h-9 flex items-center justify-center hover:bg-neutral-100 cursor-pointer ease-linear duration-100 rounded-full fill-white hover:fill-gray-800'>
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

			<Link
				to='/works/project/0001'
				className='p-3 font-bold text-sm text-white absolute bottom-0 hover:bg-white z-2 right-0 cursor-pointer rounded-tl-2xl hover:text-black w-[40%] h-[20%] flex items-center justify-center'>
				Preview
			</Link>
		</div>
	);
};

export default ImageItem;
