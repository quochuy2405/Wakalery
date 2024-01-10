/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input, InputProps } from "antd";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FieldError } from "react-hook-form";
interface TextFieldProps extends InputProps {
	error?: FieldError;
}
const TextField: React.FC<TextFieldProps> = (props) => {
	return (
		<div className='w-full flex flex-col gap-2 relative'>
			<label className='font-medium text-xs w-full'> {props.title}</label>
			<div className='flex items-center h-10 w-full relative '>
				<Input
					{...props}
					className='w-full h-full shadow-md !rounded-sm !border-none !ring-1 !ring-gray-200/90 px-3 py-2 pr-6 !text-sm'
				/>
				<span
					className='absolute right-4 duration-300 text-gray-400 opacity-50 hover:opacity-100 cursor-pointer'
					onClick={() => props?.onChange?.("" as any)}>
					<IoIosCloseCircleOutline size={18} />
				</span>
			</div>
			{!!props?.error && (
				<p className='text-red-500 text-xs absolute bottom-[-18px] z-10'>{props?.error?.message}</p>
			)}
		</div>
	);
};

export default TextField;
