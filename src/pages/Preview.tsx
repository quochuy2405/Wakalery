/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageByFaceUploadCropAI } from "@/apis/face";
import { getImageDetails } from "@/apis/get_image";
import { FloatButton } from "@/components/atoms";
import { GridImages, ModalShare, SimilarGrid } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { ImageType, PhotoDirectory } from "@/types/image";
import { canvasPreviewToBlob, getRandomColor, onDownload } from "@/utils/common";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Empty, Popconfirm, Progress, Row, Space, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";

interface DescriptionItemProps {
	title: string;
	content: React.ReactNode;
}
const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
	<div className='flex flex-col gap mt-2'>
		<p className='font-semibold text-xs'>{title}:</p>
		<p className='text-xs'> {content}</p>
	</div>
);

const PreviewImage = () => {
	const [params] = useSearchParams();
	const photoName = params.get("name");
	const [crop, setCrop] = useState<Crop>({
		unit: "%", // Can be 'px' or '%'
		x: 12,
		y: 12,
		width: 30,
		height: 30,
	});

	const dispatch = useDispatch();
	const [detailsImage, setDetailsImage] = useState<ImageType>();
	const [imageSearch, setImageSearch] = useState<PhotoDirectory[] | null>(null);
	const [dowload, setDownload] = useState(0);
	const [isSearch, setIsSearch] = useState(false);
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
	const navigate = useNavigate();
	const src = IMAGE_PREFIX + "1/" + photoName;
	const onProgress = (percent: number) => {
		setDownload(percent);
		if (percent > 99) {
			setTimeout(() => {
				setDownload(0);
			}, 200);
		}
	};
	useEffect(() => {
		if (photoName) {
			getImageDetails("1", photoName)
				.then(({ data }) => {
					setDetailsImage(data);
				})
				.catch((e) => console.log("e", e));
		}
	}, [photoName]);

	const confirm = async () => {
		if (!imgRef.current || !previewCanvasRef.current || !completedCrop) return;
		// Assuming onCropBlob returns a Promise<Blob>
		dispatch(startLoading());
		const blob = await canvasPreviewToBlob(imgRef.current, previewCanvasRef.current, completedCrop);

		const file = new File([blob], "crop_ai.png", { type: blob.type });
		// Now you can use the 'file' object as needed
		getImageByFaceUploadCropAI("1", file)
			.then(({ data }) => {
				const photos = data.map((item: any) => item.results).flat();
				setImageSearch(photos);
			})
			.catch((e) => console.log("e", e))
			.finally(() => {
				setIsSearch(false);
				dispatch(closeLoading());
			});
	};
	const onSearch = () => {
		setIsSearch(true);
	};
	const cancel = () => {
		setOpenConfirm(false);
		setIsSearch(false);
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

	return (
		<div className='w-full h-screen flex'>
			<SideBar page='works' />

			<div className='flex-1 bg-white border-l h-full overflow-y-auto'>
				<div className='flex-1 relative w-full bg-white p-4 flex flex-col items-center justify-center'>
					<div
						onClick={() => navigate(-1)}
						className='absolute top-3 left-10 p-4 w-14 h-14 flex items-center justify-center hover:bg-neutral-100 ease-linear duration-200 cursor-pointer rounded-full'>
						<svg
							className='Hn_ gUZ R19 U9O kVc'
							height='20'
							width='20'
							viewBox='0 0 24 24'
							aria-hidden='true'
							aria-label=''
							role='img'>
							<path d='M8.415 4.586a2 2 0 1 1 2.828 2.828L8.657 10H21a2 2 0 0 1 0 4H8.657l2.586 2.586a2 2 0 1 1-2.828 2.828L1 12l7.415-7.414z'></path>
						</svg>
					</div>
					<div className='flex min-h-screen w-[80%] justify-center items-center m-auto rounded-lg shadow-[0_0_10px_0px_#0000002b]'>
						<Popconfirm
							title='Search Image Similar Face'
							description='Are you sure to search this face?'
							onConfirm={confirm}
							onCancel={cancel}
							placement='right'
							okText='Search'
							open={isSearch && openConfirm}
							cancelText='Cancel'>
							<div className='w-full flex items-center justify-center h-full img-fit overflow-hidden relative bg-neutral-50'>
								{!isSearch && (
									<LazyLoadImage
										className='!h-full cursor-pointer w-full !rounded-lg overflow-hidden !object-contain'
										src={src}
										alt={`Image ${photoName}`}
										effect='blur'
										loading='lazy'
									/>
								)}

								<div className='w-full h-full overflow-hidden' hidden={!isSearch}>
									<ReactCrop
										crop={(isSearch ? crop : null) as any}
										onChange={onChangeCrop}
										className='h-full w-full'
										onComplete={onCompleteCrop}>
										<img
											className='!h-2/3 !w-2/3 m-auto rounded-2xl !object-contain'
											src={src}
											alt={`Image ${photoName}`}
											loading='lazy'
											ref={imgRef}
											crossOrigin='anonymous'
											hidden={!isSearch}
										/>
									</ReactCrop>
								</div>
							</div>
						</Popconfirm>
						<div className='w-full h-full min-h-fit p-8 relative'>
							<canvas ref={previewCanvasRef} hidden />
							{!!dowload && (
								<div className='w-full absolute top-2 h-fit flex items-center justify-between'>
									<Progress
										percent={Math.floor(+dowload.toFixed(1))}
										status='active'
										className='h-[3px] w-[80%] flex items-center justify-center gap-4 font-semibold ease-linear'
										prefixCls='%'
										strokeColor={{ from: "#f97316", to: "#fdba74" }}
									/>
								</div>
							)}
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-4'>
									<ModalShare photoName={photoName} from='private' />
									<div className='p-4 w-14 ease-linear duration-200 h-14 flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full'>
										<svg
											className='gUZ R19 U9O kVc'
											height='20'
											width='20'
											viewBox='0 0 24 24'
											aria-hidden='true'
											aria-label=''
											role='img'>
											<path d='M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z'></path>
										</svg>
									</div>
								</div>
								<div>
									<Button
										icon={<DownloadOutlined size={40} />}
										onClick={() => onDownload(src, onProgress)}
										className='bg-red-500 ease-linear duration-200 rounded-full h-12 !text-white font-semibold w-[120px] !border-none !outline-none hover:bg-red-600'>
										Save
									</Button>
								</div>
							</div>
							<div>
								<p className='font-semibold' style={{ marginBottom: 24 }}>
									Photo name: {detailsImage?.photo_name}
								</p>
								<p className='font-semibold'>Models detect</p>
								<Row>
									<Col span={12}>
										<DescriptionItem title='Type' content='Image/png' />
									</Col>
									<Col span={12}>
										<DescriptionItem title='Descriptions' content={detailsImage?.description} />
									</Col>
								</Row>

								<Divider />
								<p className='font-semibold'>Model detections</p>
								<Row className='gap-2'>
									<DescriptionItem title='Tags' content='' />
									<Space size={[0, 8]} wrap>
										{detailsImage?.tag
											?.split(",")

											.map((item) => (
												<Tag
													color={getRandomColor()}
													key={item}
													className='flex items-center gap-1 capitalize'>
													{item}
												</Tag>
											))}
									</Space>
								</Row>
								<Row className='gap-2'>
									<DescriptionItem title='Models name' content='' />
									<Space size={[0, 8]} wrap>
										{detailsImage?.model_name?.split(",").map((item) => (
											<Tag
												color={getRandomColor()}
												key={item}
												className='flex items-center gap-1 capitalize'>
												{item}
											</Tag>
										))}
									</Space>
								</Row>
								<Divider />
								<p className='font-semibold'>Details Model</p>

								<Row className='gap-2'>
									<Col span={24}>
										<DescriptionItem title='Clothes' content='' />
										<Space size={[0, 8]} wrap>
											{detailsImage?.clothes?.split(",").map((item) => (
												<Tag
													color={getRandomColor()}
													key={item}
													className='flex items-center gap-1 capitalize'>
													{item}
												</Tag>
											))}
										</Space>
									</Col>
								</Row>
								<Row className='gap-2'>
									<Col span={24}>
										<DescriptionItem title='Clothings' content='' />
										<Space size={[0, 8]} wrap>
											{detailsImage?.clothing?.split(",").map((item) => (
												<Tag
													color={getRandomColor()}
													key={item}
													className='flex items-center gap-1 capitalize'>
													{item}
												</Tag>
											))}
										</Space>
									</Col>
								</Row>
								<Row className='gap-2'>
									<Col span={24}>
										<DescriptionItem title='Prospects' content='' />
										<Space size={[0, 8]} wrap>
											{detailsImage?.prospect?.split(",").map((item) => (
												<Tag
													color={getRandomColor()}
													key={item}
													className='flex items-center gap-1 capitalize'>
													{item}
												</Tag>
											))}
										</Space>
									</Col>
								</Row>

								<Row className='gap-2'>
									<Col span={24}>
										<DescriptionItem title='Person' content='' />
										<Space size={[0, 8]} wrap>
											{detailsImage?.person?.split(",").map((item) => (
												<Tag
													color={getRandomColor()}
													key={item}
													className='flex items-center gap-1 capitalize'>
													{item}
												</Tag>
											))}
										</Space>
									</Col>
								</Row>

								<Row className='gap-2'>
									<Col span={24}>
										<DescriptionItem title='Deep clothing' content='' />
										<Space size={[0, 8]} wrap>
											{detailsImage?.deep_clothing?.split(",").map((item) => (
												<Tag
													color={getRandomColor()}
													key={item}
													className='flex items-center gap-1 capitalize'>
													{item}
												</Tag>
											))}
										</Space>
									</Col>
								</Row>
								{/* <Row className='gap-2'>
								<Col span={12}>
									<DescriptionItem title='Digital Signature' content='' />
									<Space direction='vertical' align='center'>
										<QRCode
											value={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" || "-"}
											// status="expired"
											onRefresh={() => console.log("refresh")}
										/>
									</Space>
								</Col>
							</Row> */}
							</div>
						</div>
					</div>
				</div>
				{imageSearch && (
					<div className='h-fit w-[80%] m-auto bg-white'>
						<h2 className='font-semibold  text-2xl text-left w-[80%] p-4 text-emerald-500'>
							Search Results
						</h2>
						{imageSearch.length === 0 && (
							<div className='flex items-center justify-center'>
								<Empty className='m-auto' />
							</div>
						)}
						<div className='grid grid-cols-4 gap-4'>
							<GridImages current='project' images={imageSearch} />
						</div>
					</div>
				)}
				<div className='h-fit w-[80%] m-auto bg-white'>
					<h2 className='font-semibold  text-xl text-left w-[80%] py-4 text-emerald-500'>
						Similar Images
					</h2>
					<div className='grid grid-cols-4 gap-4'>
						<SimilarGrid current='project' photoName={photoName} />
					</div>
				</div>
			</div>

			<FloatButton onSearch={onSearch} isPrivate />
		</div>
	);
};

export default PreviewImage;
