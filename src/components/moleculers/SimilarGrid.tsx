import { getImageSimilar, getImageSimilarPublic } from "@/apis/image";
import { IMAGE_PREFIX } from "@/constants/index";
import { PhotoDirectory } from "@/types/image";
import { getUserInfoCookie } from "@/utils/cookies";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Spin } from "antd";
import React, { memo, useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
interface DiscoveryProps {
	photoName: string | null | undefined;
	current: string;
	columns?: number;
}
const SimilarGrid: React.FC<DiscoveryProps> = ({ columns = 4, photoName, current }) => {
	const [loading, setLoading] = useState(false);
	const user = getUserInfoCookie();
	const [images, setImages] = useState<PhotoDirectory[]>([]);
	const grid = useMemo(() => {
		const grid = [];
		for (let i = 0; i < columns; i++) {
			grid.push(
				<div key={i} className='flex flex-col gap-2'>
					{images
						?.filter((item, index) => index % columns === i && item.photoName !== photoName)
						.map((photo, index) => (
							<Link
								to={
									current === "project"
										? `/works/project/preview?name=${photo?.photoName}`
										: `/${current}/preview?name=${photo?.photoName}`
								}
								key={index}
								className='rounded-lg overflow-hidden h-fit cursor-pointer'>
								<LazyLoadImage
									className='h-fit cursor-pointer w-full !rounded-lg overflow-hidden object-cover'
									src={IMAGE_PREFIX + `${user?.user_id}/` + photo.photoName}
									alt={`Image ${index + 1}`}
									effect='blur'
									loading='lazy'
								/>
							</Link>
						))}
				</div>
			);
		}
		return grid;
	}, [images]);

	useEffect(() => {
		if (!photoName) return;
		setLoading(true);
		switch (current) {
			case "discovery": {
				getImageSimilarPublic(photoName)
					.then(({ data }) => {
						if (data) setImages(data);
					})
					.finally(() => setLoading(false));
				break;
			}
			default: {
				getImageSimilar(photoName)
					.then(({ data }) => {
						if (data) setImages(data);
					})
					.finally(() => setLoading(false));
			}
		}
	}, [photoName]);
	if (loading)
		return (
			<div className='flex items-center justify-center col-span-12 p-8'>
				<Spin indicator={<LoadingOutlined style={{ fontSize: 33, color: "black" }} spin />} />
			</div>
		);
	if (!grid.length)
		return (
			<span className='col-span-full'>
				<Empty />
			</span>
		);
	return <>{grid}</>;
};
export default memo(SimilarGrid);
