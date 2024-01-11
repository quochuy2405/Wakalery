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
		getFavoriteByUserId("1").then(({ data }) => {
			setFavorite(data);
		});
	}, [refresh]);

	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='favorites' />
			<div className='flex-1 bg-neutral-50 h-full p-10'>
				<div className='flex items-center gap-2 font-semibold text-sm mt-6'>
					<img src={favoriteIcon} alt='Home' className={clsx("w-7 h-7")} /> <p>Favorites</p>
				</div>

				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-y-auto'>
					{favorite.map((item) => {
						return <ProjectItem refresh={() => setRefresh((e) => !e)} data={item} />;
					})}
				</section>
			</div>
		</div>
	);
};

export default Favorites;
