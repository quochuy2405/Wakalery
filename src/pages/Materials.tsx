/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageByFaceUploadCropAI } from "@/apis/face";
import { getChildByProjectId } from "@/apis/project";
import { FloatButton } from "@/components/atoms";
import { BreadcrumbProject, FolderItem, ImageItem, LoadMoveFolder } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RootState } from "@/redux/store";
import { ImageType, PhotoDirectory } from "@/types/image";
import { canvasPreviewToBlob } from "@/utils/common";
import { LoadingOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Image, Popconfirm, Spin } from "antd";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";

const Project = () => {
	const { projectId, userDirectoryId } = useParams();
	const [quickPreview, setQuickPreview] = useState<ImageType | null>(null);
	const [isSearch, setIsSearch] = useState(false);
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [materials, setMaterial] = useState<PhotoDirectory[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const refScroll = useRef<any>(null);
	const [loadingLazy, setLoadingLazy] = useState(false);
	const page = useRef(0);
	const stopLoading = useRef(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);

	const [crop, setCrop] = useState<Crop>({
		unit: "%", // Can be 'px' or '%'
		x: 12,
		y: 12,
		width: 30,
		height: 30,
	});

	const onSearch = () => {
		setIsSearch(true);
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onChangeCrop = (c: any) => {
		setCrop(c);
		if (openConfirm) {
			setOpenConfirm(false);
		}
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onCompleteCrop = (c: any) => {
		setCompletedCrop(c);
		if (!openConfirm) {
			setOpenConfirm(true);
		}
	};

	const confirm = async () => {
		if (!imgRef.current || !previewCanvasRef.current || !completedCrop) return;
		// Assuming onCropBlob returns a Promise<Blob>
		const blob = await canvasPreviewToBlob(imgRef.current, previewCanvasRef.current, completedCrop);

		const file = new File([blob], "crop_ai.png", { type: blob.type });
		// Now you can use the 'file' object as needed
		getImageByFaceUploadCropAI(file)
			.then(({ data }) => {
				console.log("data", data);
			})
			.catch((e) => console.log("e", e));
	};

	const cancel = () => {
		setOpenConfirm(false);
		setIsSearch(false);
	};

	useEffect(() => {
		if (projectId && userDirectoryId) {
			dispatch(startLoading());
			getChildByProjectId({
				folderId: Number(userDirectoryId),
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
		}
		scrollBottomListener();
		return () => {
			if (!refScroll.current) {
				refScroll.current?.removeEventListener("scrollend", () => loadingScroll());
			}
		};
	}, [projectId, refresh, userDirectoryId]);
	const loadingScroll = () => {
		if (stopLoading.current) return;
		setLoadingLazy(true);
		new Promise((resolve) => {
			stopLoading.current = true;
			page.current += 1;
			getChildByProjectId({
				folderId: Number(userDirectoryId),
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
		}).then(() => {
			setLoadingLazy(false);
		});
	};
	const scrollBottomListener = () => {
		if (!refScroll.current) return;
		refScroll.current?.addEventListener("scrollend", () => loadingScroll());
	};
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
				<Popconfirm
					title='Search Image Similar Face'
					description='Are you sure to search this face?'
					onConfirm={confirm}
					onCancel={cancel}
					okText='Search'
					placement='leftTop'
					open={isSearch && openConfirm}
					cancelText='Cancel'>
					<ReactCrop
						crop={(isSearch ? crop : null) as any}
						onChange={onChangeCrop}
						className={clsx("h-[90%] w-full rounded-lg overflow-hidden ", {
							"!cursor-default": !isSearch,
						})}
						onComplete={onCompleteCrop}>
						<section
							ref={refScroll}
							className='py-6 grid grid-cols-1 md:grid-cols-2 h-full mt-4 rounded-md lg:grid-cols-3 overflow-y-auto gap-4 md:gap-10 mb-24'>
							{materials.map((item: any) => {
								const isFolder = !!item?.userDirectoryId;
								if (isFolder) {
									return <FolderItem key={item.userDirectoryId} data={item} />;
								}
								return (
									<ImageItem
										key={item.photoSerialId}
										image={item}
										refresh={() => setRefresh((curr) => !curr)}
										onQuickPreview={(image) => {
											setQuickPreview(image);
										}}
									/>
								);
							})}
							{loadingLazy && (
								<div className='col-span-full flex justify-center'>
									<Spin
										indicator={<LoadingOutlined style={{ fontSize: 24, color: "black" }} spin />}
									/>
								</div>
							)}
						</section>
					</ReactCrop>
				</Popconfirm>
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
			<FloatButton onSearch={onSearch} isPrivate />
		</div>
	);
};

export default Project;
