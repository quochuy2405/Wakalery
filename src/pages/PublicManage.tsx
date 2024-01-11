import { getAllPubliByUserId } from "@/apis/public";
import favoriteIcon from "@/assets/favorite.svg";
import { ImageItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { ImageType } from "@/types/image";
import { Image } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { IMAGE_PREFIX } from "../constants";

const PublicManage = () => {
	const [images, setImages] = useState<ImageType[]>([]);
	const [quickPreview, setQuickPreview] = useState<ImageType | null>(null);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		getAllPubliByUserId(1).then(({ data }) => {
			setImages(data);
		});
	}, [refresh]);

	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='PublicManage' />
			<div className='flex-1 bg-neutral-50 h-full p-10'>
				<div className='flex items-center gap-2 font-semibold text-sm mt-6'>
					<img src={favoriteIcon} alt='Home' className={clsx("w-7 h-7")} /> <p>Public Manage</p>
				</div>

				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-y-auto'>
					{images.map((item) => {
						return (
							<ImageItem
								refresh={() => setRefresh((e) => !e)}
								image={item}
								onQuickPreview={(image) => {
									setQuickPreview(image);
								}}
                isPublicManage
							/>
						);
					})}
				</section>
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
			</div>
		</div>
	);
};

export default PublicManage;