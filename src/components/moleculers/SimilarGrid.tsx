import { getImageSimilar } from "@/apis/get_image";
import { IMAGE_PREFIX } from "@/constants/index";
import { PhotoDirectory } from "@/types/image";
import { memo, useEffect, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

interface DiscoveryProps {
	photoName: string | undefined;
}
const SimilarGrid: React.FC<DiscoveryProps> = memo(({ photoName }) => {
	const [images, setImages] = useState<PhotoDirectory[]>([]);
	const columns = 4; // Adjust the number of columns as needed
	const grid = useMemo(() => {
		const grid = [];
		for (let i = 0; i < columns; i++) {
			grid.push(
				<div key={i} className='flex flex-col gap-2'>
					{images
						.filter((_, index) => index % columns === i)
						.map((photo, index) => (
							<Link
								to={`/discovery/${photo?.photoName?.replace(".jpg", "")}`}
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
	}, [images]);

	useEffect(() => {
		if (!photoName) return;
		getImageSimilar("1", photoName).then(({ data }) => {
			console.log("data", data);
			setImages(data);
		});
	}, [photoName]);
	return grid;
});
export default SimilarGrid;
