/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageByFaceUploadCropAI } from "@/apis/face";
import { FloatButton } from "@/components/atoms";
import { FolderItem, ImageItem, LoadMoveFolder } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { PhotoDirectory } from "@/types/image";
import { canvasPreviewToBlob } from "@/utils/common";
import { Breadcrumb, Button, Image, Popconfirm } from "antd";
import { useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { Link } from "react-router-dom";

const Project = () => {
	const [quickPreview, setQuickPreview] = useState<PhotoDirectory | null>(null);
	const [isSearch, setIsSearch] = useState(false);
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
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
		getImageByFaceUploadCropAI("user-000001", file)
			.then(({ data }) => {
				console.log("data", data);
			})
			.catch((e) => console.log("e", e));
	};

	const cancel = () => {
		setOpenConfirm(false);
		setIsSearch(false);
	};

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
						<Button className='font-normal items-center flex justify-center text-xs !rounded-lg'>
							Upload
						</Button>
					</div>
				</div>
				<Popconfirm
					title='Search Image Similar Face'
					description='Are you sure to search this face?'
					onConfirm={confirm}
					onCancel={cancel}
          okText='Search'
          placement="leftTop"
					open={isSearch && openConfirm}
					cancelText='Cancel'>
					<ReactCrop
						crop={(isSearch ? crop : null) as any}
						onChange={onChangeCrop}
						className='h-[90%] w-full rounded-lg overflow-hidden p-4'
						onComplete={onCompleteCrop}>
						<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
							<FolderItem />
							<FolderItem />
							<FolderItem />
							<FolderItem />
							<FolderItem />
							<FolderItem />
							<FolderItem />
							<ImageItem
								image={{
									userId: 2,
									photoDirectory: "/",
									photoName: "abc",
									createAt: new Date(),
									photoSerialId: 3,
								}}
								onQuickPreview={(image) => setQuickPreview(image)}
							/>
						</section>
					</ReactCrop>
				</Popconfirm>
			</div>
			{!!quickPreview && (
				<Image
					style={{ display: "none" }}
					src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
					preview={{
						visible: true,
						src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
						onVisibleChange: (value) => {
							if (!value) setQuickPreview(null);
						},
					}}
				/>
			)}

			<LoadMoveFolder />
			<FloatButton onSearch={onSearch} isPrivate />
		</div>
	);
};

export default Project;
