import { UploadFace } from "@/components/moleculers";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Spin } from "antd";

export const botComponents = {
	hello: {
		title: "Welcome to project",
		body: <h2> I'm Warkary bot</h2>,
		show: true,
	},

	searchText: {
		title: "Using search image by Warkary bot",
		body: (
			<Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 100 }} className='w-full'>
				<Form.Item label='Enter Required' name='required'>
					<Input />
				</Form.Item>
			</Form.Item>
		),
		show: true,
		submit: (data: object) => {
			console.log("data", data);
		},
	},

	face: {
		title: "I need your face.",
		body: (
			<Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 100 }} className='w-full'>
				<UploadFace />
			</Form.Item>
		),
		show: true,
		submit: (data: object) => {
			console.log("data", data);
		},
	},
	waiting: {
		title: "Waiting...",
		body: (
			<div className='flex justify-center flex-col gap-2'>
				<div>
					<p>
						<span className="font-semibold">Wakalery</span> are searching images.
					</p>
					<p>!!! Please waiting a minute</p>
				</div>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
			</div>
		),
		show: true,
	},
	finish: {
		title: "Finish!",
		body: <h2> Result is reponsed</h2>,
		show: true,
	},
};
