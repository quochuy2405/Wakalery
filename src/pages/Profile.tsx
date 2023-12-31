import { SideBar } from "@/components/organims";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Segmented, Upload, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";

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
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='profile' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<div className=' bg-white h-full dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg'>
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
								<h3 className='font-bold text-2xl text-gray-800 dark:text-white mb-1'>
									Cait Genevieve
								</h3>
								<div className='inline-flex text-gray-700 dark:text-gray-300 items-center'>
									<svg
										className='h-5 w-5 text-gray-400 dark:text-gray-600 mr-1'
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
							<Segmented options={['Infomations', 'Contacts', "longtext-longtext-longtext-longtext"]} className="m-auto" block />
						</div>
					</div>
					<div className='px-4 py-4'>
						<div className='flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4'>
							<svg
								className='h-6 w-6 text-gray-600 dark:text-gray-400'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'>
								<path
									className=''
									d='M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z'
								/>
							</svg>
							<span>
								<strong className='text-black dark:text-white'>12</strong> Followers you know
							</span>
						</div>
						<div className='flex'>
							<div className='flex justify-end mr-2'>
								<img
									className='border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2'
									src='https://randomuser.me/api/portraits/men/32.jpg'
									alt=''
								/>
								<img
									className='border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2'
									src='https://randomuser.me/api/portraits/women/31.jpg'
									alt=''
								/>
								<img
									className='border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2'
									src='https://randomuser.me/api/portraits/men/33.jpg'
									alt=''
								/>
								<img
									className='border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2'
									src='https://randomuser.me/api/portraits/women/32.jpg'
									alt=''
								/>
								<img
									className='border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2'
									src='https://randomuser.me/api/portraits/men/44.jpg'
									alt=''
								/>
								<img
									className='border-2 border-white dark:border-gray-800 rounded-full h-10 w-10 -mr-2'
									src='https://randomuser.me/api/portraits/women/42.jpg'
									alt=''
								/>
								<span className='flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full h-10 w-10'>
									+999
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
