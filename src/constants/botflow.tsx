import { UploadFace } from "@/components/moleculers";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { PiRobotLight } from "react-icons/pi";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const botComponents = ({ onMethods }: { onMethods?: any }) => ({
	hello: {
		title: "Welcome to project",
		body: <h2>I'm Warkary bot</h2>,
		show: true,
		hiddenCancel: false,
	},
	methods: {
		title: "I'm Warkary",
		body: (
			<div className='flex flex-col gap-2'>
				<h2> Choose the methods do you want. </h2>
				<div className='flex gap-2'>
					<Button type='dashed' onClick={() => onMethods("text")} ghost>
						Text Box
					</Button>
					<Button type='dashed' onClick={() => onMethods("face")} ghost>
						Face
					</Button>
					<Button type='dashed' onClick={() => onMethods("text")} ghost>
						Similar
					</Button>
				</div>
			</div>
		),

		show: true,
		hiddenCancel: false,
	},
	searchText: {
		title: "Using search image by Warkary bot",
		body: (
			<Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 100 }} className='!w-[400px]'>
				<Form.Item label='Script' name='record'>
					<Input width={300} />
				</Form.Item>
			</Form.Item>
		),
		show: true,
		type: "record",
		hiddenCancel: false,
	},

	face: {
		title: "I need your face.",
		body: (
			<Form.Item labelCol={{ span: 6 }} name={"face"} wrapperCol={{ span: 100 }} className='w-full'>
				<UploadFace />
			</Form.Item>
		),
		show: true,
		type: "face",
	},
	waiting: {
		title: "Waiting...",
		body: (
			<div className='flex justify-center flex-col gap-2'>
				<div>
					<p>
						<span className='font-semibold'>Wakalery</span> are searching images.
					</p>
					<p>!!! Please waiting a minute</p>
				</div>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
			</div>
		),
		show: true,
		hiddenCancel: false,
	},
	finish: {
		title: "Finish!",
		body: <h2> Result is reponsed</h2>,
		show: true,
		hiddenCancel: true,
	},
	notfound: {
		title: "Sorry!",
		body: (
			<div className='flex flex-col'>
				<div className='flex gap-2 flex-col items-center'>
					<PiRobotLight size={30} />
					<h2 className='font-semibold'> Warkary don't find nothing in your data</h2>
				</div>
			</div>
		),
		show: true,
		hiddenCancel: true,
	},
});
