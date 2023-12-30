/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FOLDER_PREFIX } from "@/constants/index";
import {
  pushDirectoryMove,
  setDirectoriesCurrent,
  setDirectoryMove,
} from "@/redux/features/directorymove";
import { closeMove } from "@/redux/features/onmove";
import { RootState } from "@/redux/store";
import { PhotoDirectory } from "@/types/image";
import { arrayToTree, refactorPath } from "@/utils/common";
import { Breadcrumb, Button, Spin, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { getAllFolderByUserId, moveFolderFromDirectory } from "../../apis/folder";
import DirectoryRowMove from "./DirectoryRowMove";
const LoadMoveFolder = () => {
	const [loading, setLoading] = useState(true);
	const directoryMove = useSelector((state: RootState) => state.directorymove.currentPath);
	const directory = useSelector((state: RootState) => state.directory.currentPath);
	const directoriesTree = useSelector((state: RootState) => state.directorymove.directoriesTree);
	const fileMoves = useSelector((state: RootState) => state.filemove) as Array<string>;
	const dispatch = useDispatch();
	const refDirectories = useRef<object>({});

	const reset = async () => {
		refDirectories.current = {};
		dispatch(setDirectoriesCurrent({}));
		dispatch(setDirectoryMove("/"));
	};

	const fetch = async () => {
		await reset();
		setLoading(true);

		await getAllFolderByUserId("1")
			.then(({ data }) => {
				const disecs = data
					?.filter((item: PhotoDirectory) => !!item.photoDirectory?.startsWith("/"))
					?.map((_item: PhotoDirectory) => {
						if (_item.photoDirectory + "/" === FOLDER_PREFIX) return "";
						return _item.photoDirectory.replace(FOLDER_PREFIX, "");
					});

				const tree: any = arrayToTree(disecs, "/");
				refDirectories.current = tree;
				dispatch(setDirectoriesCurrent(tree));
			})
			.finally(() => setLoading(false));
	};

	const refresh = async () => {
		setLoading(true);
		await reset();
		await getAllFolderByUserId("1")
			.then(({ data }) => {
				const disecs = data
					?.filter((item: PhotoDirectory) => !!item.photoDirectory?.startsWith("/"))
					?.map((_item: PhotoDirectory) => {
						if (_item.photoDirectory + "/" === FOLDER_PREFIX) return "";
						return _item.photoDirectory.replace(FOLDER_PREFIX, "");
					});

				const tree: any = arrayToTree(disecs, "/");
				refDirectories.current = tree;
				const namesDir = directoryMove.split("/").filter((item: string) => !!item);
				let dirRefreshTree = tree;

				if (namesDir.length)
					namesDir.forEach((name: string) => {
						dirRefreshTree = dirRefreshTree[name];
					});
				dispatch(setDirectoryMove(directoryMove));
				dispatch(setDirectoriesCurrent(dirRefreshTree));
			})
			.finally(() => setLoading(false));
	};

	const onMove = (name: string) => {
		const newDirectory = refactorPath(directoryMove, name);
		const data = {
			userId: 1,
			oldDirectory: fileMoves,
			newDirectory: newDirectory,
		};
		moveFolderFromDirectory(data).then(async () => {
			dispatch(closeMove());
			message.success("Move completed!");
		});
	};
	useEffect(() => {
		fetch();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
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
						...directoryMove
							?.split("/")
							?.map((item: string, index: number, array: any) => {
								return {
									title: item,
									className:
										"hover:cursor-pointer  hover:bg-neutral-100 !rounded-md py-1 text-xs px-2 uppercase",
									onClick: () => {
										dispatch(setDirectoryMove(array.slice(0, index + 1).join("/")));
									},
								};
							})
							?.filter((item: any) => !!item.title),
					]}
				/>
				<div className='flex items-center gap-4 '>
					<Button
						// icon={<MdRestore size={16} />}
						onClick={async () => await refresh()}
						className='font-normal items-center flex justify-center text-xs !rounded-lg'>
						Refresh
					</Button>
				</div>
			</div>

			<div className='flex flex-col gap-1 pb-4 pt-2 flex-1 overflow-y-auto min-h-[60px]'>
				{loading && !Object?.keys(directoriesTree).length && (
					<Spin
						indicator={
							<span className='animate-spin'>
								<VscLoading />
							</span>
						}
					/>
				)}

				{!loading &&
					Object?.keys(directoriesTree)?.map((name) => {
						const isFolder = !!directoriesTree[name] || !name.split(".")?.[1];
						const dir = FOLDER_PREFIX + [directory, name].join("/");
						const regex = /\/+/g;
						const dirName = dir.replaceAll(regex, "/");
						const isExisted = fileMoves.includes(dirName);
						if (!name || isExisted) return;
						return (
							<DirectoryRowMove
								key={name}
								name={name}
								refresh={refresh}
								disabled={!name.split(".")?.[1] && !directoriesTree[name]}
								isFolder={isFolder}
								onMove={onMove}
								onClick={() => {
									// eslint-disable-next-line no-extra-boolean-cast
									if (!!directoriesTree[name]) dispatch(pushDirectoryMove(name));
								}}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default LoadMoveFolder;
