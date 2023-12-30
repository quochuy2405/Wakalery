import { getImageAll } from "@/apis/get_image";
import { DrawerInfo } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { PhotoDirectory } from "@/types/image";
import {
	DownloadOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Image, Space } from "antd";
import { memo, useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";
import { onDownload } from "@/utils/common";

interface GalleryProps {
	images: Array<PhotoDirectory>;
	onDownload: (src: string) => void;
	onClick: (value: boolean, image: PhotoDirectory) => void;
}
const Gallery: React.FC<GalleryProps> = memo(({ images, onClick, onDownload }) => {
	const columns = 7; // Adjust the number of columns as needed
	const grid = [];
	for (let i = 0; i < columns; i++) {
		grid.push(
			<div key={i} className='flex flex-col gap-2'>
				{images
					.filter((_, index) => index % columns === i)
					.map((photo, index) => (
						<div key={index} className='rounded-lg overflow-hidden h-fit !z-[10]'>
							<Image
								className=''
								preview={{
									maxScale: 1,
									onVisibleChange: (value) => {
										onClick(value, photo);
									},

									toolbarRender: (
										_,
										{
											transform: { scale },
											actions: {
												onFlipY,
												onFlipX,
												onRotateLeft,
												onRotateRight,
												onZoomOut,
												onZoomIn,
											},
										}
									) => (
										<Space size={12} className='toolbar-wrapper'>
											<DownloadOutlined
												size={40}
												onClick={() =>
													onDownload(IMAGE_PREFIX + "1/" + photo.photoName.replace(".jpg", ""))
												}
											/>
											<SwapOutlined rotate={90} onClick={onFlipY} />
											<SwapOutlined onClick={onFlipX} />
											<RotateLeftOutlined onClick={onRotateLeft} />
											<RotateRightOutlined onClick={onRotateRight} />
											<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
											<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
										</Space>
									),
								}}
								src={IMAGE_PREFIX + "1/" + photo.photoName.replace(".jpg", "")}
								loading={index % columns < 3 ? "eager" : "lazy"}
							/>
						</div>
					))}
			</div>
		);
	}
	return grid;
});

const Public = () => {
	const dispatch = useDispatch();

	const [images, setImages] = useState<PhotoDirectory[]>([]);
	const [imagePreview, setImagePreview] = useState<PhotoDirectory | null>(null);

	useEffect(() => {
		dispatch(startLoading());
		// Assuming `getImageAll` returns a promise
		getImageAll("1")
			.then((res) => {
				const data = res.data;
				console.log("data", data);
				// Assuming the API response contains an array of image URLs
				setImages(data || []);
			})
			.catch(() => {
				setImages([]);
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	}, [dispatch]);

	const onProgress = (percent: number) => {
		console.log("percent", percent);
	};

	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page="discovery"/>
			<div className='flex-1 bg-[#fdfdfd] h-full p-10'>
				<Breadcrumb
					items={[
						{
							title: "Projects",
						},
						{
							title: <Link to='/'>Project 0001</Link>,
						},
					]}
				/>
				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 h-full overflow-y-auto'>
					<Gallery
						images={images}
						onDownload={(src) => onDownload(src, onProgress)}
						onClick={(value, image) => {
							if (value) {
								setImagePreview(image);
							} else {
								setImagePreview(null);
							}
						}}
					/>
					{imagePreview && (
						<DrawerInfo imagePreview={imagePreview} onClose={() => setImagePreview(null)} />
					)}
				</section>
			</div>
		</div>
	);
};

export default Public;
