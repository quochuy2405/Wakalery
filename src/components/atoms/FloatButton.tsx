import { FloatButton } from "antd";
import React from "react";
import { LuSearch } from "react-icons/lu";
interface FloatProps {
	onSearch: () => void;
}
const Float: React.FC<FloatProps> = ({ onSearch }) => {
	return (
		<>
			<FloatButton.Group shape='square' style={{ right: 94 }}>
				<FloatButton icon={<LuSearch />} onClick={() => onSearch()} />

				<FloatButton.BackTop visibilityHeight={0} />
			</FloatButton.Group>
		</>
	);
};

export default Float;
