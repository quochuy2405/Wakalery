/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageByFaceUploadCropAI } from "@/apis/face";
import { getImageByTagsContains, getImageByTagsMatchAll, getSimilarByUpload } from "@/apis/image";
import { confirmPropmt, sendPrompt } from "@/apis/prompt";
import { botComponents } from "@/constants/botflow";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RobotType, resetRobot, setRobot } from "@/redux/features/robot";
import { setSearch } from "@/redux/features/search";
import { RootState } from "@/redux/store";
import { TagsOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { FloatButton, Form, Popconfirm, Switch, UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useRef, useState } from "react";
import { BsRobot } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputTag from "./InputTag";
interface FloatProps {
	onSearch: () => void;
	isPrivate?: boolean;
}

type FormPromtType = {
	record: string;
	faceRecord: UploadFile[];
	face: UploadFile[];
	similarRecord: UploadFile[];
	similar: UploadFile[];
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

	const onSubmit = ({ record, face, similar, faceRecord, similarRecord }: FormPromtType) => {
		switch (robot?.type) {
			case "face": {
				if (!face.length) {
					dispatch(setRobot(botComponents({}).notfound));
					return;
				}
				const file = new File([face[0]?.originFileObj as never], "crop_ai.png", {
					type: face[0].type,
				});
				dispatch(startLoading());
				getImageByFaceUploadCropAI(file)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/works/project/search?name='face'");
						form.resetFields();
					})
					.catch(() => {
						dispatch(setRobot(botComponents({}).notfound));
					})
					.finally(() => {
						dispatch(closeLoading());
					});
				break;
			}
			case "similar-record": {
				if (!similarRecord.length) {
					dispatch(setRobot(botComponents({}).notfound));
					return;
				}
				const file = new File([similarRecord[0]?.originFileObj as never], "crop_ai.png", {
					type: similarRecord[0].type,
				});
				dispatch(startLoading());
				getImageByFaceUploadCropAI(file)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/works/project/search?name='similar'");
						form.resetFields();
					})
					.catch(() => {
						dispatch(setRobot(botComponents({}).notfound));
					})
					.finally(() => {
						dispatch(closeLoading());
					});
				break;
			}
			case "similar": {
				if (!similar.length) {
					dispatch(setRobot(botComponents({}).notfound));
					form.resetFields();
					return;
				}

        dispatch(startLoading());
				getSimilarByUpload(similar[0]?.originFileObj as never)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate(`/works/project/search?name='similar by ${similar[0].name}' `);
					})
					.catch(() => {
						dispatch(setRobot(botComponents({}).notfound));
					})
					.finally(() => {
						dispatch(closeLoading());
					});
				break;
			}
			case "face-record": {
				dispatch(startLoading());
				const dataFaceFind = {
					record: refDataPromt.current?.record,
					api: refDataPromt.current?.api,
					params: refDataPromt.current?.params,
					queryFaceDetection: refDataPromt.current?.queryFaceDetection,
					querySimilarImage: refDataPromt.current?.querySimilarImage,
				};
				confirmPropmt(faceRecord[0], dataFaceFind, previewCanvasRef.current)
					.then(({ data }) => {
						if (data?.length) {
							dispatch(setSearch(data));
							navigate("/works/project/search");
							form.resetFields();
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
						onMethods("similar-record");
						return;
					}
					if (data.queryFaceDetection) {
						onMethods("face-record");
						return;
					}
					await getImageByTagsContains(data.params)
						.then(({ data: photo }) => {
							dispatch(setSearch(photo));
							navigate("/works/project/search?name=" + data?.params.toString());
							form.resetFields();
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
	const onMethods = (method: RobotType["type"]) => {
		switch (method) {
			case "face-record":
				dispatch(setRobot(botComponents({}).faceRecord));
				break;
			case "similar-record":
				dispatch(setRobot(botComponents({}).similarRecord));
				break;
			case "record":
				dispatch(setRobot(botComponents({}).searchText));
				break;
			case "face":
				dispatch(setRobot(botComponents({}).face));
				break;
			case "similar":
				dispatch(setRobot(botComponents({}).similar));
				break;
			default:
				break;
		}
	};
	const onShowBot = () => {
		setShowSearchTag(false);
		dispatch(setRobot(botComponents({ onMethods }).methods));
	};
	const onSearchByTag = async ({ tags }: { tags: Array<string> }) => {
		dispatch(resetRobot());
		switch (mode) {
			case "contains": {
				dispatch(startLoading());
				await getImageByTagsContains(tags)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/works/project/search?name=" + tags.toString());
						form.resetFields();
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
						form.resetFields();
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
						<FloatButton
							icon={<TagsOutlined />}
							onClick={() => {
								dispatch(resetRobot());
								setShowSearchTag((e) => !e);
							}}
						/>
					</Popconfirm>
				)}
				<FloatButton icon={<LuSearch />} onClick={() => onSearch()} />
			</FloatButton.Group>
		</>
	);
};

export default Float;
