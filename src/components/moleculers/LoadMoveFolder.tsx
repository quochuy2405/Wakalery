/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getChildByProjectId } from "@/apis/project";
import { closeMove } from "@/redux/features/onmove";
import { RootState } from "@/redux/store";
import { PhotoDirectory } from "@/types/image";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Breadcrumb, Button, Empty, Modal, Popconfirm, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MoveDirectory, moveFolderFromDirectory } from "../../apis/folder";
import DirectoryRowMove from "./DirectoryRowMove";
import { MdMoveDown } from "react-icons/md";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { clearFileMove } from "@/redux/features/filemove";
interface LoadMoveFolderProps {
	onCompletedMove: (item: object) => void;
}
const LoadMoveFolder: React.FC<LoadMoveFolderProps> = ({ onCompletedMove }) => {
	const [loading, setLoading] = useState(true);
	const [dataDir, setDataDir] = useState<PhotoDirectory[]>([]);
	const show = useSelector((state: RootState) => state.onmove.show);
	const fileMoves = useSelector((state: RootState) => state.filemove);
	const [currentId, setCurrentId] = useState<number | undefined>(undefined);
	const { projectId } = useParams();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const reset = async () => {
		setDataDir([]);
	};

	const fetch = async () => {
		if (!projectId) return;
		await reset();
		setLoading(true);

		if (currentId) {
			await getChildByProjectId({
				folderId: currentId,
				projectId: Number(projectId),
				page: 0,
				size: 2000,
			})
				.then(({ data }) => {
					setDataDir(data);
				})
				.finally(() => setLoading(false));
		} else {
			await getChildByProjectId({
				folderId: 0,
				projectId: Number(projectId),
				page: 0,
				size: 2000, 
			})
				.then(({ data }) => {
					const currentData = data.filter(
						(item: object) => JSON.stringify(item) !== JSON.stringify(fileMoves[0])
					);
					setDataDir(currentData);
				})
				.finally(() => setLoading(false));
		}
	};

	const onMove = async (id: number) => {
		dispatch(startLoading());
		const type: MoveDirectory["type"] = fileMoves[0]?.userDirectoryId ? "FOLDER" : "PHOTO";
		const fileId = fileMoves[0]?.userDirectoryId || fileMoves[0].photoSerialId;
		const data: MoveDirectory = {
			fileId: Number(fileId),
			newFolderId: id,
			oldProjectId: Number(projectId),
			newProjectId: Number(projectId),
			oldFolderId: Number(fileMoves[0].parentId),
			type,
		};

		await moveFolderFromDirectory(data)
			.then(async () => {
				dispatch(closeMove());
				dispatch(clearFileMove());
				onCompletedMove(fileMoves[0]);
				message.success("Moved.");
			})
			.catch(() => {
				message.error("Move failure!");
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	};
	useEffect(() => {
		if (show) fetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentId, projectId, show]);
	const closeFolder = () => {
		setCurrentId(undefined);
		dispatch(closeMove());
	};
	return (
		<Modal title='Move' open={show} width={900} footer={null} onCancel={closeFolder}>
			<div className='flex flex-col gap-3 h-fit max-h-[50vh]'>
				<div className='flex items-center justify-between'>
					<Breadcrumb
						separator='>'
						items={[
							{
								title: "Your folder",
								className:
									"hover:cursor-pointer hover:bg-neutral-100 !font-semibold !rounded-md py-1 text-xs px-2 uppercase text-emerald-400",
								onClick: () => {
									fetch();
								},
							},

							// ?.split("/")
							// ?.map((item: string, index: number, array: any) => {
							// 	return {
							// 		title: item,
							// 		className:
							// 			"hover:cursor-pointer  hover:bg-neutral-100 !rounded-md py-1 text-xs px-2 uppercase",
							// 		onClick: () => {
							// 			dispatch(setDirectoryMove(array.slice(0, index + 1).join("/")));
							// 		},
							// 	};
							// })
							// ?.filter((item: any) => !!item.title),
						]}
					/>
					<Popconfirm
						title='Move In'
						description='Are you sure to move in this folder?'
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						onConfirm={(event: any) => {
							event.stopPropagation();
							onMove(currentId || 0);
						}}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						onCancel={(event: any) => {
							event.stopPropagation();
						}}
						okText='Yes'
						cancelText='No'>
						<Button
							icon={<MdMoveDown size={16} />}
							onClick={(e) => {
								e.stopPropagation();
							}}
							className='font-normal items-center flex justify-center text-xs'>
							Move In
						</Button>
					</Popconfirm>
				</div>

				<div className='flex flex-col gap-1 pb-4 pt-2 flex-1 overflow-y-auto min-h-[60px]'>
					{loading && !dataDir?.length && (
						<Spin
							indicator={
								<span className='animate-spin'>
									<VscLoading />
								</span>
							}
						/>
					)}
					{!loading && !dataDir?.length && <Empty description='Empty folder' />}
					{!loading &&
						dataDir?.map((item) => {
							const isFolder = !!item?.userDirectoryId;
							if (!isFolder) return <></>;
							return (
								<DirectoryRowMove
									key={item.photoSerialId}
									data={item}
									disabled={false}
									isFolder={isFolder}
									onMove={() => {
										console.log("	item.photoSerialId", item);
										item.userDirectoryId && onMove(item.userDirectoryId);
									}}
									onClick={() => {
										item.userDirectoryId && setCurrentId(item.userDirectoryId);
									}}
								/>
							);
						})}
				</div>
			</div>
		</Modal>
	);
};

export default LoadMoveFolder;
