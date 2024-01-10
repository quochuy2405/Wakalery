import { IMAGE_PREFIX } from "@/constants/index";
import { PhotoDirectory } from "@/types/image";
import { Empty } from "antd";
import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

interface DiscoveryProps {
	images: Array<PhotoDirectory>;
	current: string;
}
const GridImages: React.FC<DiscoveryProps> = memo(({ images, current }) => {
	const columns = 7; // Adjust the number of columns as needed
	const grid = [];
	for (let i = 0; i < columns; i++) {
		grid.push(
			<div key={i} className='flex flex-col gap-2'>
				{images
					.filter((_, index) => index % columns === i)
					.map((photo, index) => (
						<Link
							to={`/${current}/preview?name=${photo.photoName}`}
							key={index}
							className='rounded-lg overflow-hidden cursor-pointer'>
							<LazyLoadImage
								className='cursor-pointer !m-auto !rounded-lg overflow-hidden object-cover'
								src={IMAGE_PREFIX + "1/" + photo.photoName}
								alt={`Image ${index + 1}`}
								effect='blur'
								loading='lazy'
							/>
						</Link>
					))}
			</div>
		);
	}
	if (!images.length)
		return (
			<div className='flex items-center justify-center'>
				<Empty className='m-auto' />
			</div>
		);

	return <>{grid}</>;
});
export default GridImages;
