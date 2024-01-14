/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChildByProjectId } from "@/apis/project";
import { FloatButton } from "@/components/atoms";
import { BreadcrumbProject, FolderItem, ImageItem, LoadMoveFolder } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RootState } from "@/redux/store";
import { ImageType, PhotoDirectory } from "@/types/image";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Image, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";
import { LoadingOutlined } from "@ant-design/icons";

const Project = () => {
	const { projectId } = useParams();
	const [quickPreview, setQuickPreview] = useState<ImageType | null>(null);
	const [materials, setMaterial] = useState<PhotoDirectory[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const refScroll = useRef<any>(null);
	const [loadingLazy, setLoadingLazy] = useState(false);
	const page = useRef(0);
	const stopLoading = useRef(false);
	let timeOutCurrent: any = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	useEffect(() => {
		if (projectId) {
			new Promise((resolve) => {
				dispatch(startLoading());
				resolve(true);
			}).then(() => {
				getChildByProjectId({
					folderId: 0,
					projectId: Number(projectId),
					page: page.current,
					size: 22,
				})
					.then(({ data }) => {
						setMaterial(data.content);
					})
					.catch(() => {
						setMaterial([]);
					})
					.finally(() => {
						dispatch(closeLoading());
					});
			});
		}
		scrollBottomListener();
		return () => {
			if (!refScroll.current) {
				refScroll.current?.removeEventListener("scrollend", () => loadingScroll());
			}
		};
	}, [projectId, refresh]);

	const refreshData = () => {
		setRefresh((curr) => !curr);
	};

	const onCompletedMove = (item: object) => {
		const currentMaterials = materials.filter(
			(mar) => JSON.stringify(mar) !== JSON.stringify(item)
		);
		setMaterial(currentMaterials);
	};
	const loadingScroll = () => {
		timeOutCurrent && clearInterval(timeOutCurrent);
		if (stopLoading.current) return;
		setLoadingLazy(true);
		new Promise((resolve) => {
			timeOutCurrent = setTimeout(() => {
				stopLoading.current = true;
				page.current += 1;
				getChildByProjectId({
					folderId: 0,
					projectId: Number(projectId),
					page: page.current,
					size: 22,
				}).then(({ data }) => {
					const size = data.content?.length || 0;
					stopLoading.current = false;
					if (size < 22) {
						stopLoading.current = true;
					}
					setMaterial((curr) => [...curr, ...data.content]);
					resolve(true);
				});
			}, 1000);
		}).then(() => {
			setLoadingLazy(false);
		});
	};
	const scrollBottomListener = () => {
		if (!refScroll.current) return;
		refScroll.current?.addEventListener("scrollend", () => loadingScroll());
	};

	const onUpdateItem = (prev: object, newMar: any) => {
		const current = [...materials];
		const item = current.find((item) => JSON.stringify(item) === JSON.stringify(prev));
		if (item) {
			item.folderName = newMar.folderName;
		}
		setMaterial(current);
	};
	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-hidden  flex'>
			<SideBar page='works' />

			<div className='flex-1 bg-neutral-100 h-full p-2 lg:p-10'>
				<BreadcrumbProject refresh={refreshData} />
				<section
					ref={refScroll}
					className='py-6 grid grid-cols-1 md:grid-cols-2 h-full mt-4 rounded-md lg:grid-cols-3 2xl:grid-cols-4 overflow-y-auto gap-4 md:gap-10 pb-32'>
					{materials.map((item: any) => {
						const isFolder = !!item?.userDirectoryId;
						if (isFolder) {
							return (
								<FolderItem
									onCompletedMove={onCompletedMove}
									key={item.userDirectoryId}
									folder={item}
									onUpdate={onUpdateItem}
								/>
							);
						}
						return (
							<ImageItem
								key={item.photoSerialId}
								image={item}
								onCompletedMove={onCompletedMove}
								onQuickPreview={(image) => {
									setQuickPreview(image);
								}}
							/>
						);
					})}
					{loadingLazy && (
						<div className='col-span-full flex justify-center'>
							<Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "black" }} spin />} />
						</div>
					)}
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
