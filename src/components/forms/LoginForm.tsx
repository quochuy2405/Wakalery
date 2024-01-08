import React from "react";
import { TextField, TextFieldPassword } from "../atoms";
import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	return (
		<div className='flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center'>
			<h1 className='font-bold text-center text-4xl mb-5'>Sign in</h1>

			<div className='flex w-full h-fit flex-col'>
				<div className='flex flex-col gap-4 justify-center items-center w-full'>
					<Controller
						name='username'
						control={form.control}
						render={({ field }) => <TextField title='Username' {...field} />}
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
						href='/'
						type='primary'
						className='bg-emerald-500 flex items-center justify-center button-form mt-6'>
						Sign in
					</Button>
					<span className='text-xs font-semibold text-center text-black/70 h-10'>
						Or continue with
					</span>
				</div>

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
