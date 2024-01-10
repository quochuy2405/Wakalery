import { Breadcrumb, Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalCreateFolder from "./ModalCreateFolder";
import UploadFileModal from "./UploadFileModal";

interface BreadcrumbProjectProps {
	refresh: () => void;
}
const BreadcrumbProject: React.FC<BreadcrumbProjectProps> = ({ refresh }) => {
	const [isUpload, setIsUpload] = useState<boolean>(false);
	const [isCreate, setIsCreate] = useState<boolean>(false);
	return (
		<div className='flex items-center justify-between bg-white w-full rounded-xl p-3 shadow-lg'>
			<Breadcrumb
				items={[
					{
						title: "Projects",
						className:
							"hover:cursor-pointer hover:bg-neutral-100 !font-semibold !rounded-md py-1 text-xs uppercase text-emerald-400",
					},
					{
						title: <Link to='/'>Project 0001</Link>,
						className:
							"hover:cursor-pointer hover:bg-neutral-100 !font-semibold !rounded-md py-1 text-xs uppercase text-emerald-400",
					},
				]}
			/>

			<div className='flex items-center gap-4'>
				<Button
					onClick={() => setIsCreate(true)}
					className='font-normal items-center flex justify-center text-xs !rounded-lg'>
					Create folder
				</Button>
				<Button
					onClick={() => setIsUpload(true)}
					className='font-normal items-center flex justify-center text-xs !rounded-lg'>
					Upload
				</Button>
			</div>
			<UploadFileModal refresh={refresh} open={isUpload} onClose={() => setIsUpload(false)} />
			<ModalCreateFolder refresh={refresh} open={isCreate} onClose={() => setIsCreate(false)} />
		</div>
	);
};

export default BreadcrumbProject;
