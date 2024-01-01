import { CopyOutlined } from "@ant-design/icons";
import { Button, Col, Modal, QRCode, Space } from "antd";
import React, { createContext } from "react";

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

const config = {
	title: "Sharing",
	content: (
		<div className="flex flex-col gap-2">
			<div className='flex items-center gap-3'>
				<p> Public URL: http://localhost:3000/discovery/cat</p>{" "}
				<Button icon={<CopyOutlined />}></Button>
			</div>
      <Col span={12} className="flex flex-col gap-2">
        <h2>Can QRCode</h2>
				<Space direction='vertical' align='center'>
					<QRCode
						value={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" || "-"}
						// status="expired"
						onRefresh={() => console.log("refresh")}
					/>
				</Space>
			</Col>
		</div>
	),
};

const ModalShare: React.FC = () => {
	const [modal, contextHolder] = Modal.useModal();

	return (
		<ReachableContext.Provider value='Light'>
			<Space>
				<div
					onClick={async () => {
						modal.info(config);
					}}
					className='p-4 w-14 h-14  ease-linear duration-200 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
					<svg
						className='gUZ R19 U9O kVc'
						height='20'
						width='20'
						viewBox='0 0 24 24'
						aria-hidden='true'
						aria-label=''
						role='img'>
						<path d='M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z'></path>
					</svg>
				</div>
			</Space>
			{/* `contextHolder` should always be placed under the context you want to access */}
			{contextHolder}

			{/* Can not access this context since `contextHolder` is not in it */}
			<UnreachableContext.Provider value='Bamboo' />
		</ReachableContext.Provider>
	);
};

export default ModalShare;
