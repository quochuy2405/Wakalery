/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChildByProjectId } from "@/apis/project";
import { FloatButton } from "@/components/atoms";
import { BreadcrumbProject, FolderItem, ImageItem, LoadMoveFolder } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RootState } from "@/redux/store";
import { ImageType, PhotoDirectory } from "@/types/image";
import { ThunkDispatch } from "@reduxjs/toolkit";
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	useEffect(() => {
		if (projectId) {
			dispatch(startLoading());
			getChildByProjectId({
				folderId: 0,
				projectId: Number(projectId),
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
	}, [dispatch, projectId, refresh]);
	const refreshData = () => {
		setRefresh((curr) => !curr);
	};

	const onCompletedMove = (item: object) => {
		const currentMaterials = materials.filter(
			(mar) => JSON.stringify(mar) !== JSON.stringify(item)
		);
		setMaterial(currentMaterials);
	};
	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-auto flex'>
			<SideBar page='works' />

			<div className='flex-1 bg-neutral-100 h-full p-2 lg:p-10'>
				<BreadcrumbProject refresh={refreshData} />
				<section className='py-6 grid grid-cols-1 md:grid-cols-2 h-full mt-4 rounded-md lg:grid-cols-3 overflow-y-auto gap-4 md:gap-10'>
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

			<LoadMoveFolder onCompletedMove={onCompletedMove} />
			<FloatButton onSearch={() => null} isPrivate />
		</div>
	);
};

export default Project;
