import { CreateAccountType, createAccount } from "@/apis/user";
import { signupSchema } from "@/resolvers/signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { TextField, TextFieldPassword } from "../atoms";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { closeVerify, startVerify } from "@/redux/features/verify";
import { VerifyAccount } from "../organims";
import { closeLoading, startLoading } from "@/redux/features/loading";

const defaultValues = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	email: "",
	password: "",
	confirmPassword: "",
};
const SignUpForm: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const [email, setEmail] = useState("");
	const form = useForm({
		defaultValues,
		resolver: yupResolver(signupSchema),
	});
	const onSubmit = (form: CreateAccountType & { confirmPassword?: string }) => {
		dispatch(startLoading());
		const formData = { ...form };
		if (formData.confirmPassword) delete formData.confirmPassword;
		createAccount(formData)
			.then(() => {
				setEmail(form.email);
				dispatch(startVerify());
			})
			.catch((error) => {
				console.log("error", error);
				dispatch(closeVerify());
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	};
	return (
		<div className='flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center'>
			<VerifyAccount email={email} />
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
						name='email'
						control={form.control}
						render={({ field, fieldState }) => {
							return <TextField title='Email' {...field} error={fieldState.error} />;
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
