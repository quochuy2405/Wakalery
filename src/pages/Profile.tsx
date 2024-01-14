/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo, updateProfile } from "@/apis/user";
import { TextField } from "@/components/atoms";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RootState } from "@/redux/store";
import { UserInfo } from "@/types/user";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, Form, Segmented, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	const [form] = useForm();
	const [info, setInfo] = useState<UserInfo>({});
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	const onSubmit = (profile: object) => {
		dispatch(startLoading());
		updateProfile(profile)
			.then(() => {
				message.success("Update successfuly.");
				// cookieAuthHandles.set(data.token);
				// dispatch(initToken());
			})
			.catch(() => {
				message.success("Update failure.");
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	};
	useEffect(() => {
		getUserInfo()
			.then(({ data }) => {
				form.setFieldsValue(data);
				setInfo(data);
			})
			.catch((e) => {
				console.log("e", e);
			});
	}, [token]);
	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-auto flex'>
			<SideBar page='profile' />
			<div className='flex-1 bg-neutral-100 h-full overflow-y-auto p-2 md:p-10'>
				<div className=' bg-white rounded-lg h-fit shadow-lg py-2'>
					<div className='border-b px-4 pb-6'>
						<div className='text-center my-4'>
							<div className='flex justify-center'>
								<img
									src={`https://ui-avatars.com/api/?name=${info?.firstName}&background=0D8ABC&color=fff`}
									alt='avatar'
									className='rounded-full w-[100px] h-[100px] object-cover'
								/>
							</div>

							<div className='py-2'>
								<h3 className='font-bold text-lg md:text-2xl text-gray-800 mb-1'>
									{!!info?.firstName && !!info?.lastName && info?.firstName + " " + info?.lastName}
								</h3>
								<div className='inline-flex text-gray-700 text-xs md:text-base  items-center'>
									<svg
										className='h-5 w-5 text-gray-400 mr-1'
										fill='currentColor'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										width='24'
										height='24'>
										<path
											className=''
											d='M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
										/>
									</svg>
									{info?.address}
								</div>
							</div>
						</div>
						<div className='flex gap-2 px-2'>
							<Segmented
								options={["Infomations"]}
								className='w-[400px] m-auto text-xs md:text-base '
								block
							/>
						</div>
					</div>
					<div className='px-4 py-4 md:w-2/3  m-auto'>
						<Form
							onFinish={onSubmit}
							form={form}
							className='flex flex-col gap-2 md:gap-4 justify-center items-center w-full'>
							<div className='flex flex-col md:flex-row justify-center gap-4 w-full'>
								<Form.Item
									name='firstName'
									className='flex-1'
									rules={[{ required: true, message: "Enter your first name" }]}>
									<TextField title='First name' />
								</Form.Item>
								<Form.Item
									name='lastName'
									className='flex-1'
									rules={[{ required: true, message: "Enter your last name" }]}>
									<TextField title='Last name' />
								</Form.Item>
							</div>
							<div className='flex flex-col md:flex-row justify-center gap-2 md:gap-4 w-full'>
								<Form.Item
									name='phoneNumber'
									className='flex-1'
									rules={[{ required: true, message: "Enter your phone number" }]}>
									<TextField title='Phone number' />
								</Form.Item>
								<Form.Item
									name='address'
									className='flex-1'
									rules={[{ required: true, message: "Enter your address" }]}>
									<TextField title='Address' />
								</Form.Item>
							</div>
							<Button htmlType='submit' type='primary' className='bg-main button-form mt-6'>
								Save
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
