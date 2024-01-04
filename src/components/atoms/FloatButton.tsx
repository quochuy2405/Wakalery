import { RootState } from "@/redux/store";
import { TagsOutlined } from "@ant-design/icons";
import { FloatButton, Form, Popconfirm, Switch } from "antd";
import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import InputTag from "./InputTag";
import { getImageByTagsContains, getImageByTagsMatchAll } from "@/apis/get_image";
import { setSearch } from "@/redux/features/search";
import { useNavigate } from "react-router-dom";
import { closeLoading, startLoading } from "@/redux/features/loading";
interface FloatProps {
	onSearch: () => void;
	isPrivate?: boolean;
}
const Float: React.FC<FloatProps> = ({ isPrivate = false, onSearch }) => {
	const robot = useSelector((state: RootState) => state.robot);
	const navigate = useNavigate();
	const [tags, setTags] = useState<string[]>([]);
	const [showSearchTag, setShowSearchTag] = useState(false);
	const [mode, setMode] = useState<"all" | "contains">("contains");
	const dispatch = useDispatch();
	const onSearchByTag = async () => {
		dispatch(startLoading());
		switch (mode) {
			case "contains": {
				await getImageByTagsContains(tags)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/project/search?name=" + tags.toString());
					})
					.finally(() => {
						dispatch(closeLoading());
					});
				break;
			}
			case "all": {
				await getImageByTagsMatchAll(tags)
					.then(({ data }) => {
						dispatch(setSearch(data));
						navigate("/project/search?name=" + tags.toString());
					})
					.finally(() => {
						dispatch(closeLoading());
					});
				break;
			}
		}
	};
	return (
		<>
			<FloatButton.Group shape='square' style={{ right: 94 }}>
				{isPrivate && (
					<Popconfirm
						title={robot.title}
						placement='left'
						description={robot.body}
						open={robot.show}
						// description={
						// 	<>
						// 		<Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 100 }} className='w-full'>
						// 			<Form.Item label='Enter Required' name='required'>
						// 				<Input />
						// 			</Form.Item>
						// 		</Form.Item>
						// 	</>
						// }

						forceRender={true}>
						<FloatButton icon={<BsRobot />} />
					</Popconfirm>
				)}
				{isPrivate && (
					<Popconfirm
						title={robot.title}
						placement='left'
						open={showSearchTag}
						onConfirm={onSearchByTag}
						onCancel={() => setShowSearchTag(false)}
						description={
							<>
								<Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 100 }} className='w-full'>
									<Form.Item label='Mode'>
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
									<Form.Item name='required'>
										<InputTag values={tags} onChange={(t) => setTags(t)} />
									</Form.Item>
								</Form.Item>
							</>
						}
						forceRender={true}>
						<FloatButton icon={<TagsOutlined />} onClick={() => setShowSearchTag((e) => !e)} />
					</Popconfirm>
				)}
				<FloatButton icon={<LuSearch />} onClick={() => onSearch()} />

				<FloatButton.BackTop visibilityHeight={0} />
			</FloatButton.Group>
		</>
	);
};

export default Float;
