import { RootState } from "@/redux/store";
import { FloatButton, Popconfirm } from "antd";
import React from "react";
import { BsRobot } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { useSelector } from "react-redux";
interface FloatProps {
	onSearch: () => void;
	isPrivate?: boolean;
}
const Float: React.FC<FloatProps> = ({ isPrivate = false, onSearch }) => {
  const robot = useSelector((state: RootState) => state.robot);
  
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
            
            forceRender={true}
            >
						<FloatButton icon={<BsRobot />} />
					</Popconfirm>
				)}

				<FloatButton icon={<LuSearch />} onClick={() => onSearch()} />

				<FloatButton.BackTop visibilityHeight={0} />
			</FloatButton.Group>
		</>
	);
};

export default Float;
