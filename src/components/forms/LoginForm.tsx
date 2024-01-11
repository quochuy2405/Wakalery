import { LoginAccountType, login } from "@/apis/user";
import { Button, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TextField, TextFieldPassword } from "../atoms";
import { cookieAuthHandles } from "@/utils/cookies";
import { initToken } from "@/redux/features/cookie";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (form: LoginAccountType) => {
		messageApi
			.open({
				type: "loading",
				content: "Login in progress..",
				duration: 2.5,
			})
			.then(async () => {
				await login(form)
					.then(({ data }) => {
						if (data.token) {
							cookieAuthHandles.set(data.token);
							dispatch(initToken());
							message.success("Already login.", 2.5);
							navigate("/");
						}
					})
					.catch((error) => {
						console.log("error", error);
					});
			});
	};

	return (
		<div className='flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center'>
			<h1 className='font-bold text-center text-4xl mb-5'>Sign in</h1>
			{contextHolder}
			<div className='flex w-full h-fit flex-col'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4 justify-center items-center w-full'>
					<Controller
						name='email'
						control={form.control}
						render={({ field }) => <TextField title='Email' {...field} />}
					/>
					<Controller
						name='password'
						control={form.control}
						render={({ field }) => <TextFieldPassword title='Password' {...field} />}
					/>

					<NavLink
						to='/sign'
						className='text-xs font-semibold w-full text-right text-black/70 hover:text-emerald-500'>
						Recovery Password?
					</NavLink>
					<Button
						type='primary'
						htmlType='submit'
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
