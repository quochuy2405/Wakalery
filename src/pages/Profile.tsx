/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@/components/atoms";
import { SideBar } from "@/components/organims";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Segmented, Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};
const Profile = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	const onSubmit = (data: object) => {
		console.log("data", data);
	};
	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-auto flex'>
			<SideBar page='profile' />
			<div className='flex-1 bg-neutral-100 h-full overflow-y-auto p-2 md:p-10'>
				<div className=' bg-white rounded-lg h-fit shadow-lg py-2'>
					<div className='border-b px-4 pb-6'>
						<div className='text-center my-4'>
							<Upload
								name='avatar'
								listType='picture-circle'
								className='avatar-uploader !overflow-hidden !rounded-full'
								showUploadList={false}
								action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
								beforeUpload={beforeUpload}
								onChange={handleChange}>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt='avatar'
										className='rounded-full w-[100px] h-[100px] object-cover'
									/>
								) : (
									uploadButton
								)}
							</Upload>
							<div className='py-2'>
								<h3 className='font-bold text-lg md:text-2xl text-gray-800 mb-1'>Cait Genevieve</h3>
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
									New York, NY
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
									name='phone'
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
