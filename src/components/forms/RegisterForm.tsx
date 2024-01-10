import { Button } from "antd";
import { TextField, TextFieldPassword } from "../atoms";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/resolvers/signup";
import React from "react";

const defaultValues = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	username: "",
	password: "",
	confirmPassword: "",
};
const SignUpForm: React.FC = () => {
	const form = useForm({
		defaultValues,
		resolver: yupResolver(signupSchema),
	});
	const onSubmit = (data: object) => {
		console.log("data", data);
	};
	return (
		<div className='flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center'>
			<h1 className='font-bold text-center text-4xl mb-5'>Sign up</h1>

			<div className='flex w-full h-fit flex-col'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 justify-center items-center w-full'>
					<div className='flex justify-center gap-4 w-full'>
						<Controller
							name='firstName'
							control={form.control}
							render={({ field, fieldState }) => {
								return <TextField title='First name' {...field} error={fieldState.error} />;
							}}
						/>
						<Controller
							name='lastName'
							control={form.control}
							render={({ field, fieldState }) => {
								return <TextField title='Last name' {...field} error={fieldState.error} />;
							}}
						/>
					</div>
					<Controller
						name='phoneNumber'
						control={form.control}
						render={({ field, fieldState }) => {
							return <TextField title='Phone number' {...field} error={fieldState.error} />;
						}}
					/>
					<Controller
						name='username'
						control={form.control}
						render={({ field, fieldState }) => {
							return <TextField title='Username' {...field} error={fieldState.error} />;
						}}
					/>
					<Controller
						name='password'
						control={form.control}
						render={({ field, fieldState }) => {
							return <TextFieldPassword title='Password' {...field} error={fieldState.error} />;
						}}
					/>

					<Controller
						name='confirmPassword'
						control={form.control}
						render={({ field, fieldState }) => {
							return (
								<TextFieldPassword title='Confirm Password' {...field} error={fieldState.error} />
							);
						}}
					/>

					<Button htmlType='submit' type='primary' className='bg-main button-form mt-6'>
						Sign up
					</Button>
				</form>

				<span className='text-xs font-semibold text-center text-black/70 h-10 mt-5'>
					{"Already have an account. Let's"}
					<Link to='/login' className='px-1 text-main hover:underline cursor-pointer'>
						sign in
					</Link>
					{"now."}
				</span>
			</div>
		</div>
	);
};

export default SignUpForm;
