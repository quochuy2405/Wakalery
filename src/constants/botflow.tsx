import { UploadFace } from "@/components/moleculers";
import { RobotType } from "@/redux/features/robot";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { PiRobotLight } from "react-icons/pi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const botComponents = ({
	onMethods,
}: {
	onMethods?: (type: RobotType["type"]) => void;
}) => ({
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
					<Button type='dashed' onClick={() => onMethods?.("record")} ghost>
						Text Box
					</Button>
					<Button type='dashed' onClick={() => onMethods?.("face")} ghost>
						Face
					</Button>
					<Button type='dashed' onClick={() => onMethods?.("similar")} ghost>
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
			<Form.Item wrapperCol={{ span: 100 }} className='w-full md:!w-[400px] flex flex-col gap-2'>
				<label htmlFor='' className='font-medium text-main'>
					Enter command:
				</label>
				<Form.Item name='record' rules={[{ required: true }]}>
					<TextArea rows={3} />
				</Form.Item>
			</Form.Item>
		),
		show: true,
		type: "record",
		hiddenCancel: false,
	},

	face: {
		title: "Upload the face you want find.",
		body: (
			<Form.Item name={"face"} className='w-full'>
				<UploadFace />
			</Form.Item>
		),
		show: true,
		type: "face",
	},

	faceRecord: {
		title: "I need your face.",
		body: (
			<Form.Item labelCol={{ span: 6 }} name={"faceRecord"} className='w-full'>
				<UploadFace />
			</Form.Item>
		),
		show: true,
		type: "face-record",
	},
	similar: {
		title: "Upload your image to find similar.",
		body: (
			<Form.Item labelCol={{ span: 6 }} name={"similar"} className='w-full'>
				<UploadFace />
			</Form.Item>
		),
		show: true,
		type: "similar",
	},
	similarRecord: {
		title: "I need your image to find similar.",
		body: (
			<Form.Item labelCol={{ span: 6 }} name={"similarRecord"} className='w-full'>
				<UploadFace />
			</Form.Item>
		),
		show: true,
		type: "similar-record",
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
