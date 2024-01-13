import { Breadcrumb, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModalCreateFolder from "./ModalCreateFolder";
import UploadFileModal from "./UploadFileModal";
import { getBreadcrumb } from "@/apis/project";
import { ProjectType } from "@/types/project";
import { PhotoDirectory } from "@/types/image";

interface BreadcrumbProjectProps {
	refresh: () => void;
}
const BreadcrumbProject: React.FC<BreadcrumbProjectProps> = ({ refresh }) => {
	const [isUpload, setIsUpload] = useState<boolean>(false);
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [data, setData] = useState<PhotoDirectory[]>([]);
	const projectData = useRef<ProjectType | null>(null);

	const { projectId, userDirectoryId } = useParams();
	useEffect(() => {
		getBreadcrumb({ projectId: Number(projectId), folderId: Number(userDirectoryId) || -1 }).then(
			({ data }) => {
				console.log("data", data);
				setData(data.folderList || []);
				projectData.current = data.project;
			}
		);
	}, [projectId, userDirectoryId]);
	return (
		<div className='flex md:items-center gap-2 lg:justify-between bg-white w-full rounded-xl p-2 lg:p-3 shadow-lg flex-col md:flex-row '>
			<Breadcrumb
				items={[
					{
						title: (
							<Link
								to={`/works/project/${projectData.current?.projectId}`}
								className='hover:cursor-pointer hover:bg-neutral-100 !font-semibold !rounded-md py-1 text-xs uppercase !text-emerald-400'>
								{projectData.current?.projectName}
							</Link>
						),
					},
					...data.map((item) => {
						return {
							title: (
								<Link
									to={`/works/project/${projectData.current?.projectId}/${item.userDirectoryId}`}
									className='hover:cursor-pointer hover:bg-neutral-100 !font-semibold !rounded-md py-1 text-xs uppercase text-emerald-400'>
									{item.folderName}
								</Link>
							),
						};
					}),
				]}
			/>

			<div className='flex items-center gap-4 justify-end'>
				<Button
					onClick={() => setIsCreate(true)}
					className='font-normal items-center flex justify-center text-xs !rounded-lg !p-2 !h-7 md:!h-8'>
					Create folder
				</Button>
				<Button
					onClick={() => setIsUpload(true)}
					className='font-normal items-center flex justify-center text-xs !rounded-lg !h-7 md:!h-8'>
					Upload
				</Button>
			</div>
			<UploadFileModal refresh={refresh} open={isUpload} onClose={() => setIsUpload(false)} />
			<ModalCreateFolder refresh={refresh} open={isCreate} onClose={() => setIsCreate(false)} />
		</div>
	);
};

export default BreadcrumbProject;
