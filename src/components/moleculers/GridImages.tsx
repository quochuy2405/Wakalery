import { PhotoDirectory } from "@/types/image";
import { memo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IMAGE_PREFIX } from "@/constants/index";

interface DiscoveryProps {
	images: Array<PhotoDirectory>;
}
const GridImages: React.FC<DiscoveryProps> = memo(({ images }) => {
	const columns = 7; // Adjust the number of columns as needed
	const grid = [];
	for (let i = 0; i < columns; i++) {
		grid.push(
			<div key={i} className='flex flex-col gap-2'>
				{images
					.filter((_, index) => index % columns === i)
					.map((photo, index) => (
						<Link
							to={`/discovery/${photo.photoName.replace(".jpg", "")}`}
							key={index}
							className='rounded-lg overflow-hidden h-fit cursor-pointer'>
							<LazyLoadImage
								className='h-fit cursor-pointer w-full !rounded-lg overflow-hidden object-cover'
								src={IMAGE_PREFIX + "1/" + photo.photoName.replace(".jpg", "")}
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
});
export default GridImages;
