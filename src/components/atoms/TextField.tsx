import React from "react";
import { Input, InputProps } from "antd";
import { IoIosCloseCircleOutline } from "react-icons/io";

const TextField: React.FC<InputProps> = (props) => {
	return (
		<div className="w-full flex flex-col gap-2">
			<label className="font-medium text-xs w-full"> {props.title}</label>
			<div className='flex items-center h-10 w-full relative '>
				<Input
					{...props}
					className='w-full h-full shadow-md !rounded-lg !border-none ring-2 !ring-gray-200/90 px-4 py-2 pr-6 !text-sm !font-medium'
				/>
				<span className='absolute right-4 duration-300 text-gray-400 opacity-50 hover:opacity-100 cursor-pointer'>
					<IoIosCloseCircleOutline size={18} />
				</span>
			</div>
		</div>
	);
};

export default TextField;
