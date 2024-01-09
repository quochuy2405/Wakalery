/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllMaterialtByProjectId } from "@/apis/project";
import { FloatButton } from "@/components/atoms";
import { FolderItem, ImageItem, LoadMoveFolder, UploadFileModal } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { setProject } from "@/redux/features/project";
import { RootState } from "@/redux/store";
import { ImageType } from "@/types/image";
import { getUniqueItems } from "@/utils/common";
import { Breadcrumb, Button, Image } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";

const Project = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const material = useSelector((state: RootState) => state.project.data);
	const [quickPreview, setQuickPreview] = useState<ImageType | null>(null);
	const [isUpload, setIsUpload] = useState<boolean>(false);

	const items = useMemo(() => {
		return getUniqueItems("/home/isphoto", material);
	}, [material]);

	useEffect(() => {
		if (id)
			getAllMaterialtByProjectId("1", id).then(({ data }) => {
				dispatch(setProject(data));
			});
	}, [id]);

	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='works' />

			<div className='flex-1 bg-neutral-100 h-full p-10'>
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
						<Button className='font-normal items-center flex justify-center text-xs !rounded-lg'>
							Create folder
						</Button>
						<Button
							onClick={() => setIsUpload(true)}
							className='font-normal items-center flex justify-center text-xs !rounded-lg'>
							Upload
						</Button>
					</div>
				</div>

				<section className='py-6 grid grid-cols-2 h-full mt-4 rounded-md lg:grid-cols-4 overflow-y-auto gap-10'>
					{items.map((item: any) => {
						if (item.isFolder) {
							return <FolderItem key={item.photoSerialId} data={item} />;
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
					src={IMAGE_PREFIX + "1/" + (quickPreview.photo_name || quickPreview.photoName)}
					preview={{
						visible: true,
						src: IMAGE_PREFIX + "1/" + (quickPreview.photo_name || quickPreview.photoName),
						onVisibleChange: (value) => {
							if (!value) setQuickPreview(null);
						},
					}}
				/>
			)}
			<UploadFileModal open={isUpload} onClose={() => setIsUpload(false)} />
			<LoadMoveFolder />
			<FloatButton onSearch={() => null} isPrivate />
		</div>
	);
};

export default Project;
