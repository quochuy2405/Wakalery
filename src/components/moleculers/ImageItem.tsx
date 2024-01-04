import { IMAGE_PREFIX } from "@/constants/index";
import { openMove } from "@/redux/features/onmove";
import { ImageType } from "@/types/image";
import { HeartFilled } from "@ant-design/icons";
import { Dropdown, MenuProps, Rate, Tooltip } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { GiMove } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
interface ImageItemProps {
	onQuickPreview: (image: ImageType) => void;
	image: ImageType;
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
				src={IMAGE_PREFIX + "1/" + image.photo_name}
				className='w-full h-full object-cover object-top absolute z-1'
			/>
			<p className='p-2 font-semibold bg-white text-[10px] text-black max-w-[220px] truncate leading-2 rounded-br-xl z-9 relative shadow-sm'>
				{image.photo_name}
			</p>
			<div className='absolute top-3 right-3 flex gap-1'>
				<div className='box-border w-6 h-6 flex items-center justify-center cursor-pointer rounded-full bg-neutral-100 ease-linear duration-200 '>
					<Rate count={1} className='text-[14px]' character={<HeartFilled size={0} />} />
				</div>
				<div
					onClick={() => onQuickPreview(image)}
					className='p-1 w-6 h-6 flex items-center justify-center hover:bg-neutral-100 cursor-pointer ease-linear duration-200 rounded-full text-white hover:text-gray-800'>
					<Tooltip title='Quick preview'>
						<BsEyeFill size={40} />
					</Tooltip>
				</div>

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
			</div>

			<Link
				to={`/project/preview?name=${image.photo_name}`}
				className='p-3 font-bold text-sm text-white absolute bottom-0 hover:bg-white z-2 right-0 cursor-pointer rounded-tl-2xl ease-linear duration-200 hover:text-black w-[40%] h-[20%] flex items-center justify-center'>
				Preview
			</Link>
		</div>
	);
};

export default ImageItem;
