import React from "react";
import { Input, InputProps } from "antd";

const TextField: React.FC<InputProps> = (props) => {
	return (
		<div className="w-full flex flex-col gap-2">
			<label className='font-medium text-xs w-full'> {props.title}</label>

			<Input.Password
				{...props}
				className='w-full placeholder:text-gray-500 h-10 ring-2 !ring-gray-200/90 px-4 shadow-md shadow-gray-200 !rounded-lg !border-none py-2 text-sm font-medium flex items-center justify-between'
			/>
		</div>
	);
};

export default TextField;
