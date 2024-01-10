/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChildByProjectId } from "@/apis/project";
import { FloatButton } from "@/components/atoms";
import { BreadcrumbProject, FolderItem, ImageItem, LoadMoveFolder } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { ImageType, PhotoDirectory } from "@/types/image";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";

const Project = () => {
	const { projectId } = useParams();
	const [quickPreview, setQuickPreview] = useState<ImageType | null>(null);
	const [materials, setMaterial] = useState<PhotoDirectory[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (projectId) {
			dispatch(startLoading());
			getChildByProjectId({
				folderId: "0",
				projectId: projectId,
				userId: "1",
			})
				.then(({ data }) => {
					setMaterial(data);
				})
				.catch(() => {
					setMaterial([]);
				})
				.finally(() => {
					dispatch(closeLoading());
				});
		}
	}, [projectId, refresh]);
	const refreshData = () => {
		setRefresh((curr) => !curr);
	};
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='works' />

			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<BreadcrumbProject refresh={refreshData} />
				<section className='py-6 grid grid-cols-2 h-full mt-4 rounded-md lg:grid-cols-4 overflow-y-auto gap-10'>
					{materials.map((item: any) => {
						const fileExtension = item.photoName?.split(".")?.pop()?.toLowerCase();

						// List of allowed image extensions (add more if needed)
						const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

						if (!allowedExtensions.includes(fileExtension)) {
							return <FolderItem key={item.userDirectoryId} data={item} />;
						}
						return (
							<ImageItem
								key={item.photoSerialId}
								image={item}
								onQuickPreview={(image) => {
									setQuickPreview(image);
								}}
							/>
						);
					})}
				</section>
			</div>
			{!!quickPreview && (
				<Image
					style={{ display: "none" }}
					src={IMAGE_PREFIX + "1/" + quickPreview.photoName}
					preview={{
						visible: true,
						src: IMAGE_PREFIX + "1/" + quickPreview.photoName,
						onVisibleChange: (value) => {
							if (!value) setQuickPreview(null);
						},
					}}
				/>
			)}

			<LoadMoveFolder />
			<FloatButton onSearch={() => null} isPrivate />
		</div>
	);
};

export default Project;
