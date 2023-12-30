import upload from "@/assets/upload.svg";
import { Header } from "@/components/organims";
import { Button, Form, Input, Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";

const { TextArea } = Input;
const { Dragger } = Upload;

const UploadImage = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const props: UploadProps = {
		name: "file",
		multiple: true,
		listType: "picture",

		action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
		onChange(info) {
			setFileList((curr) => [...curr, info.file]);
		},
		onDrop(e) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const files = e.dataTransfer.files as any;
			if (typeof files === "object") {
				setFileList((curr) => [...curr, ...files]);
			}
		},
	};
	const onSubmit = (data:object) => {
		console.log("fileList ", fileList);
		console.log("form", data);
	};
	return (
		<div className='h-screen flex flex-col'>
			<Header />
			<div className='max-w-7xl m-auto w-full flex-1 flex items-center justify-center'>
				<Dragger
					{...props}
					className='flex flex-1 justify-center items-center h-2/3 !bg-white gap-4'>
					<div className='flex-1 p-8 min-w-[300px] '>
						<p className='flex items-center justify-center mb-3'>
							<img src={upload} alt='Home' className='w-10 h-10' />
						</p>
						<p className='ant-upload-text'>Click or drag file to this area to upload</p>
						<p className='ant-upload-hint'>
							Support for a single or bulk upload. Strictly prohibited from uploading company data
							or other banned files.
						</p>
					</div>
				</Dragger>

				<div className='flex-[1] flex items-center justify-center'>
					<Form
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 100 }}
						className='w-full'
						onFinish={onSubmit}
						layout='horizontal'>
						<Form.Item label='Collections' name='collections'>
							<Input />
						</Form.Item>

						<Form.Item label='Descriptions' name='descriptions'>
							<TextArea rows={4} />
						</Form.Item>

						<Button
							htmlType='submit'
							className='w-fit ml-auto bg-emerald-500 !text-white flex items-center justify-center button-form mt-6'>
							Upload
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default UploadImage;
