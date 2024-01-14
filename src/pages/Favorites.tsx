import { getFavoriteByUserId } from "@/apis/project";
import favoriteIcon from "@/assets/favorite.svg";
import { ProjectItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { ProjectType } from "@/types/project";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const Favorites = () => {
	const [favorite, setFavorite] = useState<ProjectType[]>([]);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		getFavoriteByUserId().then(({ data }) => {
			setFavorite(data);
		});
	}, [refresh]);

	return (
		<div className='w-full h-screen !h-[100dvh] overflow-hidden flex'>
			<SideBar page='favorites' />
			<div className='flex-1 bg-neutral-50 h-full p-2 md:p-10'>
				<div className='flex items-center gap-2 font-semibold text-sm mt-6'>
					<img src={favoriteIcon} alt='Home' className={clsx("w-7 h-7")} /> <p>Favorites</p>
				</div>
				<div className='h-full overflow-y-auto overflow-x-hidden mt-4 rounded-md pb-32 '>
					<section className='py-6 grid grid-cols-1 md:grid-cols-2 h-fit  lg:grid-cols-3 2xl:grid-cols-4  gap-4 md:gap-10'>
						{favorite.map((item) => {
							return <ProjectItem refresh={() => setRefresh((e) => !e)} data={item} />;
						})}
					</section>
				</div>
			</div>
		</div>
	);
};

export default Favorites;
