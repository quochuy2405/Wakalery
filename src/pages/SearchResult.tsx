/* eslint-disable @typescript-eslint/no-explicit-any */
import { FloatButton } from "@/components/atoms";
import { ImageItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { RootState } from "@/redux/store";
import { ImageType } from "@/types/image";
import { Image } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { IMAGE_PREFIX } from "../constants";

const SearchResult = () => {
	const [param] = useSearchParams();
	const title = param.get("name");
	const data = useSelector((state: RootState) => state.search.data);

	const [quickPreview, setQuickPreview] = useState<ImageType | null>(null);

	const onSearch = () => {};
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='works' />

			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<div className='flex items-center justify-between bg-white w-full rounded-xl p-3 shadow-lg'>
					<h2 className='font-semibold text-emerald-500 text-xl text-left w-[80%] px-4'>
						Results search "{title}"
					</h2>
				</div>
				<section className='py-6 grid grid-cols-2 md:grid-cols-3  mt-4 rounded-md lg:grid-cols-4 overflow-y-auto gap-10 h-fit'>
					{data.map((item: any) => {
						return (
							<ImageItem
								key={item.photo_id}
								image={item}
								onQuickPreview={(image) => setQuickPreview(image)}
							/>
						);
					})}
				</section>
			</div>
			{!!quickPreview && (
				<Image
					style={{ display: "none" }}
					src={IMAGE_PREFIX + "1/" + quickPreview.photoName}
					preview={{
						visible: true,
						src: IMAGE_PREFIX + "1/" + quickPreview.photoName,
						onVisibleChange: (value) => {
							if (!value) setQuickPreview(null);
						},
					}}
				/>
			)}

			<FloatButton onSearch={onSearch} isPrivate />
		</div>
	);
};

export default SearchResult;
