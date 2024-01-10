import { getAllPublicPhoto } from "@/apis/public";
import { GridImages } from "@/components/moleculers";
import { Header } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { PhotoDirectory } from "@/types/image";
import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Public = () => {
	const dispatch = useDispatch();

	const [images, setImages] = useState<PhotoDirectory[]>([]);
	const [capture] = useState(null);

	useEffect(() => {
		dispatch(startLoading());
		// Assuming `getImageAll` returns a promise
		getAllPublicPhoto()
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

	return (
		<div className='flex flex-col w-full h-screen overflow-y-auto bg-white'>
			<Header page="discovery" />
			<div className='flex-1 w-full h-full bg-white p-4 flex flex-col overflow-y-auto'>
				<div className='flex justify-between'>
					<h2 className='font-extrabold text-4xl uppercase leading-[90px] z-10 opacity-70 top-20 py-3'>
						Explore more
					</h2>
					<Button href="/upload-public" className='bg-main flex items-center text-white px-5 !rounded-full h-10 text-xs font-semibold hover:!text-gray-100'>
						Upload
					</Button>
				</div>
				<div className='grid lg:grid-cols-4 xl:grid-cols-7 gap-3 relative'>
					<GridImages current="discovery" images={images} />

					{capture && <Image src={capture} />}
				</div>
			</div>
		</div>
	);
};

export default Public;
