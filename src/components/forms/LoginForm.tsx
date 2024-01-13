import { LoginAccountType, login } from "@/apis/user";
import { initToken } from "@/redux/features/cookie";
import { RootState } from "@/redux/store";
import { loginSchema } from "@/resolvers/login";
import { cookieAuthHandles } from "@/utils/cookies";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, message } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TextField, TextFieldPassword } from "../atoms";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (form: LoginAccountType) => {
		const account = { ...form };
		setLoading(true);
		messageApi
			.open({
				type: "loading",
				content: "Login in progress..",
			})
			.then(async () => {
				return await login(account)
					.then(({ data }) => {
						if (data.token) {
							cookieAuthHandles.set(data.token);
							dispatch(initToken());
							message.success("Already login.", 2.5);
							navigate("/");
						}
					})
					.catch(() => {
						// const response = error.response;
						message.error("Login failure.", 2.5);
					});
			})
			.then(() => {
				setLoading(false);
			});
	};

	return (
		<div className='flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center'>
			<h1 className='font-bold text-center text-4xl mb-5'>Sign in</h1>
			{contextHolder}
			<div className='flex w-full h-fit flex-col'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6 justify-center items-center w-full'>
					<Controller
						name='email'
						control={form.control}
						disabled={loading}
						render={({ field, fieldState }) => (
							<TextField title='Email' {...field} error={fieldState.error} />
						)}
					/>
					<Controller
						name='password'
						control={form.control}
						disabled={loading}
						render={({ field, fieldState }) => (
							<TextFieldPassword title='Password' {...field} error={fieldState.error} />
						)}
					/>

					<NavLink
						to='/sign'
						className='text-xs font-semibold w-full text-right text-black/70 hover:text-emerald-500'>
						Recovery Password?
					</NavLink>
					<Button
						type='primary'
						htmlType='submit'
						disabled={loading}
						className='bg-emerald-500 flex items-center justify-center button-form mt-6'>
						Sign in
					</Button>
					<span className='text-xs font-semibold text-center text-black/70 h-10'>
						Or continue with
					</span>
				</form>

				<div className='flex-1 flex h-full justify-center items-start gap-4'>
					<Button
						type='primary'
						icon={<FcGoogle size={24} />}
						className='!bg-neutral-100 !rounded-md hover:!bg-white !h-14 hover:ring-2 hover:ring-gray-400 !w-24 !flex !items-center !justify-center !border-2'
					/>
					<Button
						type='primary'
						icon={<FaFacebook size={24} color='#1778F2' />}
						className='!bg-neutral-100 !rounded-md hover:!bg-white hover:ring-2 hover:ring-[#1778F2] !h-14 !w-24 !flex !items-center !justify-center !border-2'
					/>
				</div>
				<span className='text-xs font-semibold text-center text-black/70 h-10 mt-5'>
					{"If you haven't an account. Let's"}
					<Link to='/signup' className='px-1 text-main hover:underline cursor-pointer'>
						register
					</Link>
					{"now."}
				</span>
			</div>
		</div>
	);
};

export default LoginForm;
