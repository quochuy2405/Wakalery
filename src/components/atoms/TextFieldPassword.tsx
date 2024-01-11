/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Input, InputProps } from "antd";
import { FieldError } from "react-hook-form";
interface TextFieldProps extends InputProps {
	error?: FieldError;
}
const TextField = React.forwardRef<object, TextFieldProps>((props, _ref) => {
	return (
		<div className='w-full flex flex-col gap-2 relative'>
			<label className='font-medium text-xs w-full'> {props.title}</label>

			<Input.Password
				{...props}
				className='w-full h-full shadow-md !rounded-sm !border-none !ring-1 !ring-gray-200/90 px-2 py-2 pr-4 !text-sm'
			/>
			{!!props?.error && (
				<p className='text-red-500 text-xs absolute bottom-[-18px] z-10'>{props?.error?.message}</p>
			)}
		</div>
	);
});

export default TextField;
