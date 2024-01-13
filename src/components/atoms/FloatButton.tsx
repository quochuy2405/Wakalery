/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageByTagsContains, getImageByTagsMatchAll } from "@/apis/image";
import { botComponents } from "@/constants/botflow";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { resetRobot, setRobot } from "@/redux/features/robot";
import { setSearch } from "@/redux/features/search";
import { RootState } from "@/redux/store";
import { TagsOutlined } from "@ant-design/icons";
import { FloatButton, Form, Popconfirm, Switch, UploadFile } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputTag from "./InputTag";
import { useForm } from "antd/es/form/Form";
import { confirmPropmt, sendPrompt } from "@/apis/prompt";
import { ThunkDispatch } from "@reduxjs/toolkit";
interface FloatProps {
	onSearch: () => void;
	isPrivate?: boolean;
}

type FormPromtType = {
	record: string;
	face: UploadFile[];
};
const Float: React.FC<FloatProps> = ({ isPrivate = false, onSearch }) => {
	const [form] = useForm();
	const [formTag] = useForm();
	const robot = useSelector((state: RootState) => state.robot);
	const navigate = useNavigate();
	const [showSearchTag, setShowSearchTag] = useState(false);
	const [mode, setMode] = useState<"all" | "contains">("contains");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const refDataPromt = useRef<any>();
	const previewCanvasRef = useRef<any>();

	const onSubmit = ({ record, face }: FormPromtType) => {
		switch (robot?.type) {
			case "face": {
				dispatch(startLoading());
				const dataFaceFind = {
					record: refDataPromt.current?.record,
					api: refDataPromt.current?.api,
					params: refDataPromt.current?.params,
					queryFaceDetection: refDataPromt.current?.queryFaceDetection,
					querySimilarImage: refDataPromt.current?.querySimilarImage,
				};
				confirmPropmt(face[0], dataFaceFind, previewCanvasRef.current)
					.then(({ data }) => {
						if (data?.length) {
							dispatch(setSearch(data));
							navigate("/works/project/search");
						} else {
							throw "error";
						}
					})
					.catch(() => {
						dispatch(setRobot(botComponents({}).notfound));
					})
					.finally(() => {
						dispatch(closeLoading());
					});
				break;
			}
			case "record": {
				dispatch(startLoading());
				sendPrompt(record).then(async ({ data }) => {
					refDataPromt.current = data;

					dispatch(closeLoading());
					if (data.querySimilarImage) {
						onMethods("face");
						return;
					}
					if (data.queryFaceDetection) {
						onMethods("face");
						return;
					}
					await getImageByTagsContains(data.params)
						.then(({ data: photo }) => {
							dispatch(setSearch(photo));
							navigate("/works/project/search?name=" + data?.params.toString());
						})
						.catch(() => {
							dispatch(setRobot(botComponents({}).notfound));
						})
						.finally(() => {
							dispatch(closeLoading());
						});
				});
				break;
			}
		}
	};
	const onMethods = (method: "face" | "text") => {
		switch (method) {
			case "face":
				dispatch(setRobot(botComponents({}).face));
				break;
			case "text":
				dispatch(setRobot(botComponents({}).searchText));
				break;
			default:
				break;
		}
	};
	const onShowBot = () => {
		dispatch(setRobot(botComponents({ onMethods }).methods));
	};
	const onSearchByTag = async ({ tags }: { tags: Array<string> }) => {
		switch (mode) {
			case "contains": {
				dispatch(startLoading());
				await getImageByTagsContains(tags)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/works/project/search?name=" + tags.toString());
					})
					.catch(() => {
						dispatch(setRobot(botComponents({}).notfound));
					})
					.finally(() => {
						dispatch(closeLoading());
						setShowSearchTag(false);
					});
				break;
			}
			case "all": {
				dispatch(startLoading());
				await getImageByTagsMatchAll(tags)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/works/project/search?name=" + tags.toString());
					})
					.catch(() => {
						dispatch(setRobot(botComponents({}).notfound));
					})
					.finally(() => {
						dispatch(closeLoading());
						setShowSearchTag(false);
					});
				break;
			}
		}
	};

	useEffect(() => {
		dispatch(resetRobot());
	}, []);

	return (
		<>
			<FloatButton.Group shape='square' className='right-[8%] z-50'>
				<canvas ref={previewCanvasRef} hidden />
				{isPrivate && (
					<Form form={form} onFinish={onSubmit}>
						<Popconfirm
							title={robot.title}
							placement='left'
							description={robot.body}
							open={robot.show}
							okButtonProps={{ htmlType: "submit" }}
							onCancel={() => dispatch(resetRobot())}
							okText={"Ok"}
							onConfirm={() => {
								form.submit();
								if (robot.hiddenCancel) {
									dispatch(resetRobot());
								}
							}}
							showCancel={!robot?.hiddenCancel}
							forceRender={true}>
							<FloatButton
								onClick={() => {
									if (!robot.show) {
										onShowBot();
									}
								}}
								icon={<BsRobot />}
							/>
						</Popconfirm>
					</Form>
				)}
				{isPrivate && (
					<Popconfirm
						title={"Choose tags"}
						placement='left'
						open={showSearchTag}
						onConfirm={() => formTag.submit()}
						onCancel={() => setShowSearchTag(false)}
						description={
							<Form form={formTag} onFinish={onSearchByTag} className='flex flex-col'>
								<Form.Item className='!mb-2 flex gap-2'>
									<label htmlFor='' className='font-medium text-main pr-2'>
										Mode:
									</label>
									<Switch
										title='Match'
										value={mode === "all"}
										checkedChildren='All'
										onChange={(value) => {
											if (value) {
												setMode("all");
											} else {
												setMode("contains");
											}
										}}
										unCheckedChildren='In'
										className='bg-gray-500'
									/>
								</Form.Item>
								<Form.Item name='tags' rules={[{ required: true }]}>
									<InputTag />
								</Form.Item>
							</Form>
						}
						forceRender={true}>
						<FloatButton icon={<TagsOutlined />} onClick={() => setShowSearchTag((e) => !e)} />
					</Popconfirm>
				)}
				<FloatButton icon={<LuSearch />} onClick={() => onSearch()} />
			</FloatButton.Group>
		</>
	);
};

export default Float;
