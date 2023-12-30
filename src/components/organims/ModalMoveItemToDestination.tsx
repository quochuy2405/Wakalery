import { closeMove } from "@/redux/features/onmove";
import { RootState } from "@/redux/store";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LoadMoveFolder } from "../moleculers";

const ModalDetination = () => {
	const show = useSelector((state: RootState) => state.onmove.show);
	const dispatch = useDispatch();
	const handleOk = () => {
		dispatch(closeMove());
	};
	return (
		<Modal
			title='Move'
			open={show}
			width={900}
			onOk={handleOk}
			okText='Move'
			onCancel={() => dispatch(closeMove())}>
			<LoadMoveFolder />
		</Modal>
	);
};

export default ModalDetination;
