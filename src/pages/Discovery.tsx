/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPublicPhoto } from "@/apis/public";
import { GridImages } from "@/components/moleculers";
import { Header } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RootState } from "@/redux/store";
import { PhotoDirectory } from "@/types/image";
import { LoadingOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Image, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Public = () => {
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const [loadingLazy, setLoadingLazy] = useState(false);
	const [images, setImages] = useState<PhotoDirectory[]>([]);
	const refScroll = useRef<any>(null);
	const page = useRef(0);
	const stopLoading = useRef(false);
	let timeOutCurrent: any = null;
	const [capture] = useState(null);

	useEffect(() => {
		dispatch(startLoading());
		// Assuming `getImageAll` returns a promise
		getAllPublicPhoto({ size: 22, page: 0 })
			.then((res) => {
				const data = res.data;

				// Assuming the API response contains an array of image URLs
				setImages(data.content || []);
			})
			.catch(() => {
				setImages([]);
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	}, [dispatch]);

	const loadingScroll = () => {
		timeOutCurrent && clearInterval(timeOutCurrent);
		if (stopLoading.current) return;
		setLoadingLazy(true);
		new Promise((resolve) => {
			timeOutCurrent = setTimeout(() => {
				stopLoading.current = true;
				page.current += 1;
				getAllPublicPhoto({ size: 22, page: page.current }).then(({ data }) => {
					const size = data.content?.length || 0;
					stopLoading.current = false;
					if (size < 22) {
						stopLoading.current = true;
					}
					setImages((curr) => [...curr, ...data.content]);
					resolve(true);
				});
			}, 1000);
		}).then(() => {
			setLoadingLazy(false);
		});
	};

	const scrollBottomListener = () => {
		if (!refScroll.current) return;
		refScroll.current?.addEventListener("scrollend", () => loadingScroll());
	};

	useEffect(() => {
		scrollBottomListener();
		return () => {
			if (!refScroll.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				refScroll.current?.removeEventListener("scrollend", () => loadingScroll());
			}
		};
	}, []);
	return (
		<div className='flex flex-col w-full h-screen !h-[100dvh] overflow-y-auto overflow-x-hidden bg-white'>
			<Header page='discovery' />
			<div
				ref={refScroll}
				className='flex-1 w-full h-full bg-white p-4 flex flex-col overflow-y-auto pb-24'>
				<div className='flex justify-between'>
					<h2 className='font-extrabold text-xl lg:text-4xl uppercase lg:leading-[90px] z-10 opacity-70 top-20 py-3'>
						Explore more
					</h2>
					{/* <Button
						href='/upload-public'
						className='bg-main flex items-center text-white px-5 !rounded-full h-10 text-xs font-semibold hover:!text-gray-100'>
						Upload
					</Button> */}
				</div>
				<div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 relative'>
					<GridImages current='discovery' images={images || []} />
					{loadingLazy && (
						<div className='col-span-full flex justify-center'>
							<Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "black" }} spin />} />
						</div>
					)}
					{capture && <Image src={capture} />}
				</div>
			</div>
		</div>
	);
};

export default Public;
